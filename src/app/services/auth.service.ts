import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as AuthActions from "../components/auth/store/auth.actions";
import * as fromApp from "../store/app.reducer";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(private store: Store<fromApp.AppState>) {}

	private tokenExpirationTimer: number = null;

	/**
	 * Performs automatic logout using a timer.
	 *
	 * @param delay The number of **milliseconds** until firing the timer.
	 */
	setLogoutTimer(delay: number) {
		this.tokenExpirationTimer = window.setTimeout(() => {
			this.store.dispatch(new AuthActions.Logout());
		}, delay);
	}

	/**
	 * Clears the logout timer (effectively disabling any running timer).
	 */
	clearLogoutTimer() {
		if (this.tokenExpirationTimer) {
			clearTimeout(this.tokenExpirationTimer);
			this.tokenExpirationTimer = null;
		}
	}
}
