import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { User } from "src/app/model/user";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import * as AuthActions from "./auth.actions";

@Injectable()
export class AuthEffects {
	constructor(
		private actions$: Actions<AuthActions.AuthActions>,
		private http: HttpClient,
		private router: Router,
		private authService: AuthService
	) {}

	// 'side effect' when user wants to login
	@Effect()
	authLogin = this.actions$.pipe(
		ofType(AuthActions.LOGIN_START),
		switchMap((loginStartAction) => {
			// send HTTP POST request to the backend
			return this.http
				.post<FirebaseSigninResponse>(environment.signinEndpoint, {
					email: loginStartAction.payload.email,
					password: loginStartAction.payload.password,
					returnSecureToken: true,
				})
				.pipe(
					map((response) => {
						return this.handleAuthentication(
							response.email,
							response.localId,
							response.idToken,
							+response.expiresIn
						);
					}),
					/*
						we must return here a non-error observable.
						Otherwise, our outer observable (actions$)
						will die and we can't continue with that
						state in our app.

						Actions observable (actions$) must not die
						while the app is running!
					*/
					catchError(this.handleError)
				);
		})
	);

	// 'side effect' when user wants to signup
	@Effect()
	authSignUp = this.actions$.pipe(
		ofType(AuthActions.SIGNUP_START),
		switchMap((signupStartAction) => {
			// send HTTP POST request to the backend
			return this.http
				.post<FirebaseSignupResponse>(environment.signupEndpoint, {
					email: signupStartAction.payload.email,
					password: signupStartAction.payload.password,
					returnSecureToken: true,
				})
				.pipe(
					map((response) => {
						return this.handleAuthentication(
							response.email,
							response.localId,
							response.idToken,
							+response.expiresIn
						);
					}),
					/*
						we must return here a non-error observable.
						Otherwise, our outer observable (actions$)
						will die and we can't continue with that
						state in our app.

						Actions observable (actions$) must not die
						while the app is running!
					*/
					catchError(this.handleError)
				);
		})
	);

	// 'side effect' when user successfully logged in
	@Effect({ dispatch: false })
	authRedirect = this.actions$.pipe(
		ofType(AuthActions.AUTHENTICATION_SUCCESS),
		tap((authSuccessAction) => {
			if (authSuccessAction.payload.redirect) {
				this.router.navigate(["/"]);
			}
		})
	);

	// 'side effect' when user automatically login
	@Effect()
	autoLogin = this.actions$.pipe(
		ofType(AuthActions.AUTO_LOGIN),
		map(() => {
			// fetches the user data from local storage
			const userData: {
				email: string;
				id: string;
				_token: string;
				_tokenExpirationDate: string;
			} = JSON.parse(localStorage.getItem("userData"));

			if (userData) {
				const expirationDate = new Date(userData._tokenExpirationDate);
				const currentDate = new Date();

				// validates that the user token didn't expire
				if (expirationDate > currentDate) {
					this.authService.setLogoutTimer(expirationDate.getTime() - currentDate.getTime());

					return new AuthActions.AuthenticationSuccess({
						email: userData.email,
						userId: userData.id,
						token: userData._token,
						expirationDate: expirationDate,
						redirect: true,
					});
				}
			}

			// ? maybe need to change to AuthenticationFail
			return new AuthActions.Logout();
		})
	);

	// 'side effect' when user automatically logged out
	@Effect({ dispatch: false })
	autoLogout = this.actions$.pipe(
		ofType(AuthActions.LOGOUT),
		tap(() => {
			localStorage.removeItem("userData");
			this.authService.clearLogoutTimer();
			this.router.navigate(["/auth"]);
		})
	);

	/**
	 * Handles the authentication process.
	 *
	 * @param email The email of the user.
	 * @param userId The user ID (UID).
	 * @param token The auth ID token.
	 * @param expiresIn The number of **seconds** in which the Auth ID token will expires.
	 */
	private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
		const currentDate = new Date();
		const expirationDate = new Date(currentDate.getTime() + expiresIn * 1000);

		// creates the user object
		const user = new User(email, userId, token, expirationDate);

		// saves the user in the local storage
		localStorage.setItem("userData", JSON.stringify(user));

		// starts the automatic logout timer
		this.authService.setLogoutTimer(expiresIn * 1000);

		return new AuthActions.AuthenticationSuccess({
			email,
			userId,
			token,
			expirationDate,
			redirect: true,
		});
	}

	/**
	 * Authentication error handler.
	 *
	 * @param response The HTTP error response.
	 */
	private handleError(response: HttpErrorResponse) {
		let errorMessage: string;

		switch (response.error?.error?.message) {
			case "EMAIL_EXISTS":
				errorMessage = "The email address is already in use by another account";
				break;

			case "EMAIL_NOT_FOUND":
				errorMessage = "The email address can't be found. Account may have been deleted";
				break;

			case "INVALID_PASSWORD":
				errorMessage = "Invalid password";
				break;

			case "USER_DISABLED":
				errorMessage = "The account has been disabled by an administrator";
				break;

			default:
				errorMessage = "An error occurred";
				break;
		}

		return of(new AuthActions.AuthenticationFail(errorMessage));
	}
}

/**
 * HTTP response for a successful sign-up
 * on the Firebase platform.
 */
export interface FirebaseSignupResponse {
	/**
	 * A Firebase Auth ID token for the newly created user.
	 */
	idToken: string;
	/**
	 * The email for the newly created user.
	 */
	email: string;
	/**
	 * A Firebase Auth refresh token for the newly created user.
	 */
	refreshToken: string;
	/**
	 * The number of seconds in which the Auth ID token expires.
	 */
	expiresIn: string;
	/**
	 * The user ID (UID) of the newly created user.
	 */
	localId: string;
}

/**
 * HTTP response for a successful login
 * on the Firebase platform.
 */
export interface FirebaseSigninResponse {
	/**
	 * A Firebase Auth ID token for the authenticated user.
	 */
	idToken: string;
	/**
	 * The email for the authenticated user.
	 */
	email: string;
	/**
	 * A Firebase Auth refresh token for the authenticated user.
	 */
	refreshToken: string;
	/**
	 * The number of seconds in which the Auth ID token expires.
	 */
	expiresIn: string;
	/**
	 * The user ID (UID) of the authenticated user.
	 */
	localId: string;
	/**
	 * Whether the email is for an existing account.
	 */
	registered: boolean;
}
