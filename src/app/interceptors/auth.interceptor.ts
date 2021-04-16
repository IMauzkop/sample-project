import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { exhaustMap, first, map } from "rxjs/operators";
import * as fromApp from "../store/app.reducer";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private store: Store<fromApp.AppState>) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return this.store.select("auth").pipe(
			first(),
			map((authState) => authState.user),
			exhaustMap((user) => {
				if (!user) {
					return next.handle(request);
				} else {
					const requestWithAuth = request.clone({
						setParams: {
							auth: user.token,
						},
					});

					return next.handle(requestWithAuth);
				}
			})
		);
	}
}
