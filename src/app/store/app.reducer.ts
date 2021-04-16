import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../components/auth/store/auth.reducer";
import * as fromRecipes from "../components/recipes/store/recipe.reducer";
import * as fromShoppingList from "../components/shopping-list/store/shopping-list.reducer";

// the global application state
export interface AppState {
	shoppingList: fromShoppingList.State;
	auth: fromAuth.State;
	recipes: fromRecipes.State;
}

/*
	map of all the reducers available in our app.
	The keys are the properties of the global state.
	The value for-each key is a reducer function
	which responsible for that state.
*/
export const reducers: ActionReducerMap<AppState> = {
	shoppingList: fromShoppingList.shoppingListReducer,
	auth: fromAuth.authReducer,
	recipes: fromRecipes.recipeReducer,
};
