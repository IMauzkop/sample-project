import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import * as fromApp from "src/app/store/app.reducer";
import * as RecipeActions from "../store/recipe.actions";

@Component({
	selector: "app-recipe-edit",
	templateUrl: "recipe-edit.component.html",
	styleUrls: ["recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
	constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) {}

	editMode = false;
	recipeForm: FormGroup = null;
	recipeID: number = null;
	storeSubscription: Subscription = null;

	get recipeIngredients() {
		return this.recipeForm.get("ingredients") as FormArray;
	}

	ngOnInit() {
		this.route.paramMap.subscribe((paramMap) => {
			this.recipeID = Number.parseInt(paramMap.get("recipe-id"));
			this.editMode = Number.isInteger(this.recipeID);
			this.initForm();
		});
	}

	ngOnDestroy() {
		this.storeSubscription?.unsubscribe();
	}

	getValidationClasses(controlPath: string | (string | number)[]) {
		const control = this.recipeForm.get(controlPath);

		return {
			"is-valid": control.valid && (control.dirty || control.touched),
			"is-invalid": control.invalid && (control.dirty || control.touched),
		};
	}

	onSubmit() {
		if (this.editMode) {
			this.store.dispatch(
				new RecipeActions.UpdateRecipe({
					index: this.recipeID,
					newRecipe: this.recipeForm.value,
				})
			);
		} else {
			this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
		}

		this.router.navigate(["../"], { relativeTo: this.route });
	}

	onCancel() {
		this.router.navigate(["../"], { relativeTo: this.route });
	}

	onAddIngredient() {
		(this.recipeForm.get("ingredients") as FormArray).push(
			new FormGroup({
				name: new FormControl(null, [Validators.required]),
				amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
			})
		);
	}

	onDeleteIngredient(index: number) {
		(this.recipeForm.get("ingredients") as FormArray).removeAt(index);
	}

	private initForm() {
		// set the form-controls initial values as variables
		let recipeName: string = null;
		let recipeImagePath: string = null;
		let recipeDescription: string = null;
		let recipeIngredients = new FormArray([]);

		// in-case of edit mode (we're editing an existing recipe)
		if (this.editMode) {
			this.storeSubscription = this.store
				.select("recipes")
				.pipe(
					map((recipesState) => {
						return recipesState.recipes.find((_recipe, index) => {
							return index === this.recipeID;
						});
					})
				)
				.subscribe((recipe) => {
					// set the form-controls values to the recipe values
					recipeName = recipe.name;
					recipeImagePath = recipe.imagePath;
					recipeDescription = recipe.description;

					if (recipe.ingredients?.length !== 0) {
						for (const ingredient of recipe.ingredients) {
							recipeIngredients.push(
								new FormGroup({
									name: new FormControl(ingredient.name, Validators.required),
									amount: new FormControl(ingredient.amount, [
										Validators.required,
										Validators.pattern(/^[1-9]+[0-9]*$/),
									]),
								})
							);
						}
					}
				});
		}

		// update the form-model accordingly
		this.recipeForm = new FormGroup({
			name: new FormControl(recipeName, Validators.required),
			imagePath: new FormControl(recipeImagePath, {
				updateOn: "blur",
				validators: Validators.required,
			}),
			description: new FormControl(recipeDescription, Validators.required),
			ingredients: recipeIngredients,
		});
	}
}
