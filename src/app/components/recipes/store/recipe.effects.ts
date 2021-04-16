import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "src/app/model/recipe";
import * as fromApp from "src/app/store/app.reducer";
import { environment } from "src/environments/environment";
import * as RecipeActions from "./recipe.actions";

@Injectable()
export class RecipeEffects {
	constructor(private action$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {}

	@Effect()
	fetchRecipes = this.action$.pipe(
		ofType(RecipeActions.FETCH_RECIPES),
		switchMap(() => {
			// send HTTP GET request to the backend
			return this.http.get<Recipe[]>(environment.storageEndpoint).pipe(
				map((recipes) => {
					return recipes.map((recipe) => {
						if (recipe.ingredients === undefined) {
							recipe.ingredients = [];
						}
						return recipe;
					});
				}),
				map((recipes) => new RecipeActions.SetRecipes(recipes))
			);
		})
	);

	@Effect({ dispatch: false })
	storeRecipes = this.action$.pipe(
		ofType(RecipeActions.STORE_RECIPES),
		withLatestFrom(this.store.select("recipes")),
		switchMap(([_storeRecipesAction, recipesState]) => {
			// send HTTP PUT request to the backend
			return this.http.put(environment.storageEndpoint, recipesState.recipes);
		})
	);
}
