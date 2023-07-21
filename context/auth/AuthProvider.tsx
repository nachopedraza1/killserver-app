import { FC, ReactNode, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';
import { isAxiosError } from 'axios';

import { IUser } from '@/interfaces';
import { killApi } from '@/api';
import { useSession } from 'next-auth/react';


export interface AuthState {
    authenticated: boolean;
    user?: IUser;
}


const Auth_INITIAL_STATE: AuthState = {
    authenticated: false,
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    const { data, status } = useSession();
    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user! as IUser })
        }
    }, [data, status])


    const registerUser = async (name: string, email: string, password: string) => {
        try {
            const { data } = await killApi.post('/user/register', { name, email, password })
            dispatch({ type: '[Auth] - Login', payload: data.user });
            return {
                hasError: false
            }
        } catch (error) {
            if (isAxiosError(error)) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
        }
        return {
            hasError: true,
            message: 'Something went wrong, please try again later.'
        }
    }

    return (
        <AuthContext.Provider value={{
            ...state,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};