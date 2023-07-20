import { FC, ReactNode, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { IUser } from '@/interfaces';

export interface AuthState {
    authenticated: boolean;
    user?: IUser;
}


const Auth_INITIAL_STATE: AuthState = {
    authenticated: false,
}


export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    return (
        <AuthContext.Provider value={{
            ...state
        }}>
            {children}
        </AuthContext.Provider>
    )
};