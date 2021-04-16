import { Recipe } from "src/app/model/recipe";
import * as RecipeActions from "./recipe.actions";

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

// shape of the state used in recipeReducer
export interface State {
	recipes: Recipe[];
}

// an initial value for the state
const initialState: State = {
	recipes: [],
};

// reducer function that handle state changes for the associated recipe actions
export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions): State {
	switch (action.type) {
		case RecipeActions.SET_RECIPES: {
			// update the state
			return {
				...state,
				recipes: [...action.payload],
			};
		}

		case RecipeActions.ADD_RECIPE: {
			// update the state
			return {
				...state,
				recipes: [...state.recipes, action.payload],
			};
		}

		case RecipeActions.UPDATE_RECIPE: {
			// creates the updated recipe
			const updatedRecipe = {
				...state.recipes[action.payload.index],
				...action.payload.newRecipe,
			};

			// creates a new recipes array with the updated recipe
			const updatedRecipes = [...state.recipes];
			updatedRecipes[action.payload.index] = updatedRecipe as Recipe;

			// update the state
			return {
				...state,
				recipes: updatedRecipes,
			};
		}

		case RecipeActions.DELETE_RECIPE: {
			/*
				gets all of the recipes from state, excluding
				the one in the index which is equal to the
				'action.payload'
			*/
			const recipes = state.recipes.filter((_recipe, index) => {
				return index !== action.payload;
			});

			// update the state
			return {
				...state,
				recipes,
			};
		}

		default: {
			return state;
		}
	}
}
