import { Ingredient } from "src/app/model/ingredient";
import * as ShoppingListActions from "./shopping-list.actions";

/* Reducers
##################################################
• Reducers in NgRx are responsible for handling
transitions from one state to the next state in
the application. Reducer functions handle these
transitions by determining which actions to
handle based on the action's 'type'.

• Reducers are pure functions in that they
produce the same output for a given input. They
are without side effects and handle each state
transition synchronously!.

• Each reducer function takes the latest Action
dispatched, the current state, and determines
whether to return a newly modified state or the
original state.

• When an action is dispatched, all registered
reducers receive the action!.
##################################################
*/

// shape of the state used in shoppingListReducer
export interface State {
	ingredients: Ingredient[];
	editedIngredient: Ingredient;
	editedIngredientIndex: number;
}

// an initial value for the state
const initialState: State = {
	ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
	editedIngredient: null,
	editedIngredientIndex: -1,
};

// reducer function that handle state changes for the associated shopping-list actions
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions): State {
	switch (action.type) {
		case ShoppingListActions.ADD_INGREDIENT: {
			// update the state
			return {
				...state,
				ingredients: [...state.ingredients, action.payload],
			};
		}

		case ShoppingListActions.ADD_INGREDIENTS: {
			// update the state
			return {
				...state,
				ingredients: [...state.ingredients, ...action.payload],
			};
		}

		case ShoppingListActions.UPDATE_INGREDIENT: {
			// gets the values for the new updated ingredient
			const { name, amount } = action.payload;

			// creates the updated ingredient accordingly
			const updateIngredient = new Ingredient(name, amount);

			// gets all of the ingredients from the state
			const updateIngredients = [...state.ingredients];

			// updates the ingredients array with that new ingredient
			updateIngredients[state.editedIngredientIndex] = updateIngredient;

			// update the state
			return {
				...state,
				ingredients: updateIngredients,

				/*
					after deleting / updating an ingredient,
					we need to reset the state that there is
					no currently ingredient to edit
				*/
				editedIngredient: null,
				editedIngredientIndex: -1,
			};
		}

		case ShoppingListActions.DELETE_INGREDIENT: {
			/*
				gets all of the ingredients from state, excluding
				the one in the index which is equal to the current
				'editedIngredientIndex'
			*/
			const ingredients = state.ingredients.filter((_ingredient, index) => {
				return index !== state.editedIngredientIndex;
			});

			// update the state
			return {
				...state,
				ingredients,

				/*
					after deleting / updating an ingredient,
					we need to reset the state that there is
					no currently ingredient to edit
				*/
				editedIngredient: null,
				editedIngredientIndex: -1,
			};
		}

		case ShoppingListActions.START_EDIT_INGREDIENT: {
			const ingredient = state.ingredients[action.payload];
			const editedIngredient = new Ingredient(ingredient.name, ingredient.amount);

			// update the state
			return {
				...state,
				editedIngredientIndex: action.payload,
				editedIngredient,
			};
		}

		case ShoppingListActions.STOP_EDIT_INGREDIENT: {
			// update the state
			return {
				...state,
				editedIngredient: null,
				editedIngredientIndex: -1,
			};
		}

		default: {
			return state;
		}
	}
}
