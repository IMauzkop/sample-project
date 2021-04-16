import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "src/app/store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from "../recipes/store/recipe.actions";

@Component({
	selector: "app-header",
	templateUrl: "header.component.html",
	styleUrls: ["header.component.css"],
})
export class HeaderComponent {
	constructor(private store: Store<fromApp.AppState>) {}

	isNavbarShown = false;

	onSaveData() {
		this.store.dispatch(new RecipeActions.StoreRecipes());
	}

	onFetchData() {
		this.store.dispatch(new RecipeActions.FetchRecipes());
	}

	onLogOut() {
		this.store.dispatch(new AuthActions.Logout());
	}

	toggleNavbar() {
		this.isNavbarShown = !this.isNavbarShown;
	}
}
