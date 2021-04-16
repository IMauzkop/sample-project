import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/model/ingredient";

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
export const ADD_INGREDIENT = "[Shopping List] Add Ingredient";
export const ADD_INGREDIENTS = "[Shopping List] Add Ingredients";
export const UPDATE_INGREDIENT = "[Shopping List] Update Ingredient";
export const DELETE_INGREDIENT = "[Shopping List] Delete Ingredient";
export const START_EDIT_INGREDIENT = "[Shopping List] Start Edit Ingredient";
export const STOP_EDIT_INGREDIENT = "[Shopping List] Stop Edit Ingredient";

/**
 * Represents the action of adding new ingredient
 * to the shopping-list.
 */
export class AddIngredient implements Action {
	/**
	 * @param payload The new ingredient to add.
	 */
	constructor(public payload: Ingredient) {}

	readonly type = ADD_INGREDIENT;
}

/**
 * Represents the action of adding new ingredients
 * to the shopping-list.
 */
export class AddIngredients implements Action {
	/**
	 * @param payload The ingredients to add.
	 */
	constructor(public payload: Ingredient[]) {}

	readonly type = ADD_INGREDIENTS;
}

/**
 * Represents the action of updating an ingredient
 * in the shopping list.
 */
export class UpdateIngredient implements Action {
	/**
	 * @param payload The ingredient to update.
	 */
	constructor(public payload: Ingredient) {}

	readonly type = UPDATE_INGREDIENT;
}

/**
 * Represents the action of deleting an ingredient
 * from the shopping-list.
 */
export class DeleteIngredient implements Action {
	readonly type = DELETE_INGREDIENT;
}

/**
 * Represents the action of starting to edit an
 * ingredient in the shopping-list.
 */
export class StartEditIngredient implements Action {
	/**
	 * @param payload The index of the ingredient to edit.
	 */
	constructor(public payload: number) {}

	readonly type = START_EDIT_INGREDIENT;
}

/**
 * Represents the action of ending to edit an
 * ingredient in the shopping-list.
 */
export class StopEditIngredient {
	readonly type = STOP_EDIT_INGREDIENT;
}

/**
 * Represents the shopping-list actions
 * available in the app.
 */
export type ShoppingListActions =
	| AddIngredient
	| AddIngredients
	| UpdateIngredient
	| DeleteIngredient
	| StartEditIngredient
	| StopEditIngredient;
