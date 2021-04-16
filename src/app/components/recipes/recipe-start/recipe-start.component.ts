import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as fromApp from "src/app/store/app.reducer";

@Component({
	selector: "app-recipe-start",
	template: `<h1>{{ title }}</h1>`,
	styles: [
		`
			h1 {
				margin: 5rem auto;
				max-width: 20rem;
				position: sticky;
				text-align: center;
				top: 10rem;
			}

			@media screen and (min-width: 767px) {
				h1 {
					margin-top: 10rem;
				}
			}
		`,
	],
})
export class RecipeStartComponent implements OnInit, OnDestroy {
	constructor(private store: Store<fromApp.AppState>) {}

	title: string = null;
	private recipesSubscription: Subscription = null;

	ngOnInit() {
		const recipesTitle = "Select A Recipe From The List";
		const noRecipesTitle = "No Recipes Available";

		this.recipesSubscription = this.store.select("recipes", "recipes").subscribe((recipes) => {
			this.title = recipes.length > 0 ? recipesTitle : noRecipesTitle;
		});
	}

	ngOnDestroy() {
		this.recipesSubscription.unsubscribe();
	}
}
