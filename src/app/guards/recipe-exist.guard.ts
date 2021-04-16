import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class RecipeExistGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		/*
			get the URL path-variable with a name of 'recipe-id'
			from the next ActivatedRouteSnapshot and convert it
			to a number
		*/
		const recipeID = Number.parseInt(next.paramMap.get("recipe-id"));

		// if recipeID is a number...
		if (Number.isInteger(recipeID)) {
			// check if a recipe with that id exists in the recipe service
			// const isExist = this.recipeService.getRecipe(recipeID) !== undefined;

			// if exists, continue the navigation. Otherwise, go back to the root path
			// return isExist ? true : this.router.parseUrl("/");
		}

		// if recipeID isn't a number...
		else {
			// go back to the root path
			return this.router.parseUrl("/");
		}
	}
}
