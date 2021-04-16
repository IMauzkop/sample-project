import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Ingredient } from "src/app/model/ingredient";
import * as fromApp from "src/app/store/app.reducer";
import { StartEditIngredient } from "./store/shopping-list.actions";

@Component({
	selector: "app-shopping-list",
	templateUrl: "shopping-list.component.html",
	styleUrls: ["shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit {
	constructor(private store: Store<fromApp.AppState>) {}

	ingredients: Ingredient[];

	ngOnInit() {
		this.store.select("shoppingList").subscribe((state) => {
			this.ingredients = state.ingredients;
		});
	}

	onEditIngredient(index: number) {
		this.store.dispatch(new StartEditIngredient(index));
	}
}
