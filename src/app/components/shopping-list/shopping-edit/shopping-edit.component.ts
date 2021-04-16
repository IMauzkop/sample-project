import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredient } from "src/app/model/ingredient";
import * as fromApp from "src/app/store/app.reducer";
import { AddIngredient, DeleteIngredient, StopEditIngredient, UpdateIngredient } from "../store/shopping-list.actions";

@Component({
	selector: "app-shopping-edit",
	templateUrl: "shopping-edit.component.html",
	styleUrls: ["shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	constructor(private store: Store<fromApp.AppState>) {}

	private _editMode = false;
	private editedIngredient: Ingredient;
	private subscription: Subscription;

	@ViewChild("editForm")
	private editForm: NgForm;

	get editMode() {
		return this._editMode;
	}

	ngOnInit() {
		// subscribe to the store to get the shopping-list state
		this.subscription = this.store.select("shoppingList").subscribe((state) => {
			// are we editing an ingredient
			if (state.editedIngredientIndex > -1) {
				this._editMode = true;
				this.editedIngredient = state.editedIngredient;
				this.editForm.setValue({
					name: this.editedIngredient.name,
					amount: this.editedIngredient.amount,
				});
			} else {
				this._editMode = false;
			}
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
		this.store.dispatch(new StopEditIngredient());
	}

	onSubmit(form: NgForm) {
		// get the 'name' and 'amount' form-controls values
		const { name, amount } = form.value;

		// create a new ingredient object
		const newIngredient = new Ingredient(name, amount);

		// are we updating or adding an ingredient
		if (this._editMode) {
			this.store.dispatch(new UpdateIngredient(newIngredient));
		} else {
			this.store.dispatch(new AddIngredient(newIngredient));
		}

		this.onClear();
	}

	onDelete() {
		this.store.dispatch(new DeleteIngredient());
		this.onClear();
	}

	onClear() {
		this.store.dispatch(new StopEditIngredient());
		this.editForm.resetForm();
		this._editMode = false;
	}
}
