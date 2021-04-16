import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { Recipe } from "src/app/model/recipe";
import * as fromApp from "src/app/store/app.reducer";

@Component({
	selector: "app-recipe-list",
	templateUrl: "recipe-list.component.html",
	styleUrls: ["recipe-list.component.css"],
})
export class RecipeListComponent implements OnInit, OnDestroy {
	constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) {}

	recipes: Recipe[];
	subscription: Subscription;

	ngOnInit() {
		this.subscription = this.store
			.select("recipes")
			.pipe(map((recipesState) => recipesState.recipes))
			.subscribe((recipes) => (this.recipes = recipes));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	onNewRecipe() {
		this.router.navigate(["new"], { relativeTo: this.route });
	}
}
