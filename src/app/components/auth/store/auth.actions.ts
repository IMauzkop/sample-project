import { Action } from "@ngrx/store";

/* Actions
##################################################
• Actions are one of the main building blocks in
NgRx. Actions express unique events that happen
throughout the application, such as:
* User interaction with the page
* External interaction through network requests
* Direct interaction with device APIs

• An Action in NgRx is made up of a simple
interface containing a single property - 'type',
represented as a string.

• The value of 'type' comes in the form of:
'[Source] Event' and is used to provide a context
of what category of action it is, and where an
action was dispatched from.
##################################################
*/

// actions identifiers
export const AUTHENTICATION_SUCCESS = "[Auth] Authentication Success";
export const AUTHENTICATION_FAIL = "[Auth] Authentication Fail";
export const LOGIN_START = "[Auth] Login Start";
export const SIGNUP_START = "[Auth] Signup Start";
export const AUTO_LOGIN = "[Auth] Auto Login";
export const CLEAR_ERROR = "[Auth] Clear Error";
export const LOGOUT = "[Auth] Logout";

/**
 * Represents the action of a user who has
 * successfully logged into the app.
 */
export class AuthenticationSuccess implements Action {
	/**
	 * @param payload The user authentication data.
	 */
	constructor(
		public payload: {
			email: string;
			userId: string;
			token: string;
			expirationDate: Date;
			redirect: boolean;
		}
	) {}

	readonly type = AUTHENTICATION_SUCCESS;
}

/**
 * Represents the action of a login failure.
 */
export class AuthenticationFail implements Action {
	/**
	 * @param payload The failure message.
	 */
	constructor(public payload: string) {}

	readonly type = AUTHENTICATION_FAIL;
}

/**
 * Represents the action of a user trying to
 * login to the app.
 */
export class LoginStart implements Action {
	/**
	 * @param payload The user authentication data.
	 */
	constructor(
		public payload: {
			email: string;
			password: string;
		}
	) {}

	readonly type = LOGIN_START;
}

/**
 * Represents the action of a user trying to
 * sign-up to the app.
 */
export class SignupStart implements Action {
	/**
	 * @param payload The user authentication data.
	 */
	constructor(
		public payload: {
			email: string;
			password: string;
		}
	) {}

	readonly type = SIGNUP_START;
}

/**
 * Represents the action of automatically
 * login to the app.
 */
export class AutoLogin implements Action {
	readonly type = AUTO_LOGIN;
}

/**
 * Represents the action of clearing an
 * error from the store.
 */
export class ClearError implements Action {
	readonly type = CLEAR_ERROR;
}

/**
 * Represents the action of a user trying to
 * logout from the app.
 */
export class Logout implements Action {
	readonly type = LOGOUT;
}

/**
 * Represents the authentication actions
 * available in the app.
 */
export type AuthActions =
	| AuthenticationSuccess
	| AuthenticationFail
	| LoginStart
	| SignupStart
	| AutoLogin
	| ClearError
	| Logout;
