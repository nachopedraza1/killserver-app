import { AuthState } from './';


type AuthActionType =
    | { type: '[Auth] - Login' }


export const authReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - Login':
            return {
                ...state,
            }

        default:
            return state;
    }

}