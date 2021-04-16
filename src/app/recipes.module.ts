import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./components/recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./components/recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./components/recipes/recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./components/recipes/recipes.component";
import { AuthGuard } from "./guards/auth.guard";
import { RecipeExistGuard } from "./guards/recipe-exist.guard";
import { RecipesResolver } from "./guards/recipes.resolver";
import { SharedModule } from "./shared.module";

const routes: Routes = [
	{
		path: "",
		component: RecipesComponent,
		resolve: [RecipesResolver],
		canActivate: [AuthGuard],
		children: [
			{
				path: "",
				component: RecipeStartComponent,
			},
			{
				path: "new",
				component: RecipeEditComponent,
			},
			{
				path: ":recipe-id",
				component: RecipeDetailComponent,
				// canActivate: [RecipeExistGuard],
			},
			{
				path: ":recipe-id/edit",
				component: RecipeEditComponent,
				// canActivate: [RecipeExistGuard],
			},
		],
	},
];

@NgModule({
	declarations: [
		RecipeDetailComponent,
		RecipeEditComponent,
		RecipeItemComponent,
		RecipeListComponent,
		RecipesComponent,
		RecipeStartComponent,
	],
	imports: [ReactiveFormsModule, RouterModule.forChild(routes), SharedModule],
})
export class RecipesModule {}
