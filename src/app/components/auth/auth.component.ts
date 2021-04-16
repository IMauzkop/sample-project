import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { PlaceholderDirective } from "src/app/directives/placeholder.directive";
import * as fromApp from "src/app/store/app.reducer";
import { AlertComponent } from "../alert/alert.component";
import * as AuthActions from "./store/auth.actions";

@Component({
	selector: "app-auth",
	templateUrl: "auth.component.html",
	styleUrls: ["auth.component.css"],
})
export class AuthComponent implements OnInit, OnDestroy {
	constructor(private componentFactoryResolver: ComponentFactoryResolver, private store: Store<fromApp.AppState>) {}

	/**
	 * A flag indicating if this component is in login
	 * mode or sign-up mode.
	 */
	isLoginMode = true;

	/**
	 * A flag indicating if this component is in loading
	 * mode (e.g: fetching data from a server).
	 */
	isLoading = false;

	/**
	 * Error message in-case of authentication failure.
	 */
	error: string = null;

	closeSubscription: Subscription;
	storeSubscription: Subscription;

	/**
	 * Reference to the PlaceholderDirective from the template
	 * (`appPlaceholder`).
	 */
	@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

	ngOnInit() {
		this.storeSubscription = this.store.select("auth").subscribe((authState) => {
			this.isLoading = authState.loading;
			this.error = authState.authError;

			if (this.error) {
				this.showErrorAlert(this.error);
			}
		});
	}

	ngOnDestroy() {
		this.closeSubscription?.unsubscribe();
		this.storeSubscription?.unsubscribe();
	}

	/**
	 * Switches the component between login mode and
	 * sign-up mode.
	 */
	onSwitchMode() {
		this.isLoginMode = !this.isLoginMode;
	}

	onSubmit(authForm: NgForm) {
		if (authForm.invalid) return;

		// gets the user data from the form-controls
		const email: string = authForm.value.email;
		const password: string = authForm.value.password;

		// removes any preceding error
		this.error = null;

		if (this.isLoginMode) {
			this.store.dispatch(
				new AuthActions.LoginStart({
					email,
					password,
				})
			);
		} else {
			this.store.dispatch(
				new AuthActions.SignupStart({
					email,
					password,
				})
			);
		}

		// resets the form back to its initial state
		authForm.reset();
	}

	onCloseAlert() {
		this.store.dispatch(new AuthActions.ClearError());
	}

	/**
	 * Shows an error using the AlertComponent as a modal.
	 *
	 * @param error The error message to show.
	 */
	private showErrorAlert(error: string) {
		// gets the component factory of AlertComponent
		const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

		/*
			creates variable to ViewContainerRef of the
			PlaceholderDirective in this component
			template, and clear all of its views
		*/
		const viewContainerRef = this.alertHost.viewContainerRef;
		viewContainerRef.clear();

		// creates AlertComponent dynamically
		const alertComponent = viewContainerRef.createComponent(alertComponentFactory).instance;

		// sets AlertComponent data-bound property value (@Input)
		alertComponent.message = error;

		// subscribes to AlertComponent custom event emitter (@Output)
		this.closeSubscription = alertComponent.close.subscribe(() => {
			viewContainerRef.clear();
			this.closeSubscription.unsubscribe();
		});
	}
}
