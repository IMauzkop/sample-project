import { User } from "src/app/model/user";
import * as AuthActions from "./auth.actions";

/* Reducers
##################################################
• Reducers in NgRx are responsible for handling
transitions from one state to the next state in
the application. Reducer functions handle these
transitions by determining which actions to
handle based on the action's 'type'.

• Reducers are pure functions in that they
produce the same output for a given input. They
are without side effects and handle each state
transition synchronously!.

• Each reducer function takes the latest Action
dispatched, the current state, and determines
whether to return a newly modified state or the
original state.

• When an action is dispatched, all registered
reducers receive the action!.
##################################################
*/

// shape of the state used in authReducer
export interface State {
	user: User;
	authError: string;
	loading: boolean;
}

// an initial value for the state
const initialState: State = {
	user: null,
	authError: null,
	loading: false,
};

// reducer function that handle state changes for the associated auth actions
export function authReducer(state = initialState, action: AuthActions.AuthActions): State {
	switch (action.type) {
		case AuthActions.AUTHENTICATION_SUCCESS: {
			// create the user object
			const user = new User(
				action.payload.email,
				action.payload.userId,
				action.payload.token,
				action.payload.expirationDate
			);

			// update the state
			return {
				...state,
				user,
				authError: null,
				loading: false,
			};
		}

		case AuthActions.AUTHENTICATION_FAIL: {
			// update the state
			return {
				...state,
				user: null,
				authError: action.payload,
				loading: false,
			};
		}

		case AuthActions.LOGIN_START:
		case AuthActions.SIGNUP_START: {
			// update the state
			return {
				...state,
				authError: null,
				loading: true,
			};
		}

		case AuthActions.CLEAR_ERROR: {
			// update the state
			return {
				...state,
				authError: null,
			};
		}

		case AuthActions.LOGOUT: {
			// update the state
			return {
				...state,
				user: null,
			};
		}

		default: {
			return state;
		}
	}
}
