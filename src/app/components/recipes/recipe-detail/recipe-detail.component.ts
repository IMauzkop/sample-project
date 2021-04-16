import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs/operators";
import { Recipe } from "src/app/model/recipe";
import * as fromApp from "src/app/store/app.reducer";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as RecipeActions from "../store/recipe.actions";

@Component({
	selector: "app-recipe-detail",
	templateUrl: "recipe-detail.component.html",
	styleUrls: ["recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) {}

	recipe: Recipe;
	recipeID: number;

	ngOnInit() {
		this.route.paramMap
			.pipe(
				// sets the recipeID from the path variable 'recipe-id'
				map((paramMap) => (this.recipeID = +paramMap.get("recipe-id"))),

				// retrieves the recipes state from the store
				switchMap(() => this.store.select("recipes")),

				// find the recipe with the same index as recipeID
				map((recipesState) => {
					return recipesState.recipes.find((_recipe, index) => {
						return index === this.recipeID;
					});
				})
			)
			.subscribe((recipe) => (this.recipe = recipe));
	}

	onAddToShoppingList() {
		this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
	}

	onEditRecipe() {
		this.router.navigate(["edit"], { relativeTo: this.route });
	}

	onDeleteRecipe() {
		this.store.dispatch(new RecipeActions.DeleteRecipe(this.recipeID));
		this.router.navigate(["/recipes"]);
	}
}
