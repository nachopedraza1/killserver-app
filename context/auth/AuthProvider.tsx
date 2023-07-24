import { FC, ReactNode, useEffect, useReducer } from 'react';
import { AuthContext, authReducer } from './';

import { signOut, useSession } from 'next-auth/react';
import axios, { isAxiosError } from 'axios';

import { alertSnack } from '@/utils';
import { killApi } from '@/api';

import { IUser } from '@/interfaces';

export interface AuthState {
    authenticated: boolean;
    recaptcha: boolean;
    user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
    authenticated: false,
    recaptcha: false,
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    const { data, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user! as IUser })
        }
    }, [data, status])

    useEffect(() => {
        if (status === 'authenticated') {
            alertSnack(`Welcome ${data.user?.name!}`, 'success');
        }
    }, [status])


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

    const logoutUser = () => {
        dispatch({ type: '[Auth] - Logout' });
        signOut();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            logoutUser,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};