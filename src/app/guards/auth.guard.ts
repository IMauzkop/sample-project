import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";

@Injectable({
	providedIn: "root",
})
export class AuthGuard implements CanActivate {
	constructor(private router: Router, private store: Store<fromApp.AppState>) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.store.select("auth").pipe(
			first(),
			map((state) => {
				// get the user object from the auth state
				const user = state.user;

				// continue if user exist, or go to the '/auth' page
				if (Boolean(user)) {
					return true;
				}
				return this.router.createUrlTree(["/auth"]);
			})
		);
	}
}
