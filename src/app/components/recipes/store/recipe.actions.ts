import { Action } from "@ngrx/store";
import { Recipe } from "src/app/model/recipe";

/* Actions
##################################################
• Actions are one of the main building blocks in
NgRx. Actions express unique events that happen
throughout the application, such as:
* User interaction with the page
* External interaction through network requests
* Direct interaction with device APIs

• An Action in NgRx is made up of a simple
interface containing a single property - 'type',
represented as a string.

• The value of 'type' comes in the form of:
'[Source] Event' and is used to provide a context
of what category of action it is, and where an
action was dispatched from.
##################################################
*/

// actions identifiers
export const FETCH_RECIPES = "[Recipes] Fetch Recipes";
export const STORE_RECIPES = "[Recipes] Store Recipes";
export const SET_RECIPES = "[Recipes] Set Recipes";
export const ADD_RECIPE = "[Recipes] Add Recipe";
export const UPDATE_RECIPE = "[Recipes] Update Recipe";
export const DELETE_RECIPE = "[Recipes] Delete Recipe";

/**
 * Represents the action of fetching recipes
 * from a backend to the store.
 */
export class FetchRecipes implements Action {
	readonly type = FETCH_RECIPES;
}

/**
 * Represents the action of putting recipes
 * from the store in the backend.
 */
export class StoreRecipes implements Action {
	readonly type = STORE_RECIPES;
}

/**
 * Represents the action of putting recipes
 * in the store.
 */
export class SetRecipes implements Action {
	/**
	 * @param payload The recipes to add.
	 */
	constructor(public payload: Recipe[]) {}

	readonly type = SET_RECIPES;
}

/**
 * Represents the action of adding a recipe
 * to the store.
 */
export class AddRecipe implements Action {
	/**
	 * @param payload The recipe to add.
	 */
	constructor(public payload: Recipe) {}

	readonly type = ADD_RECIPE;
}

/**
 * Represents the action of updating a
 * recipe in the store.
 */
export class UpdateRecipe implements Action {
	/**
	 * @param payload The index of the recipe to update, and the updated recipe.
	 */
	constructor(
		public payload: {
			index: number;
			newRecipe: Recipe;
		}
	) {}

	readonly type = UPDATE_RECIPE;
}

/**
 * Represents the action of deleting a
 * recipe from the store.
 */
export class DeleteRecipe implements Action {
	/**
	 * @param payload The index of the recipe to delete.
	 */
	constructor(public payload: number) {}

	readonly type = DELETE_RECIPE;
}

/**
 * Represents the recipes actions
 * available in the app.
 */
export type RecipeActions = FetchRecipes | StoreRecipes | SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe;
