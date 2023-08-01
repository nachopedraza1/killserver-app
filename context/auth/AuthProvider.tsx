import { FC, ReactNode, useEffect, useReducer } from 'react';
import { useRouter } from 'next/router';
import { AuthContext, authReducer } from './';

import { signIn, signOut, useSession } from 'next-auth/react';
import { isAxiosError } from 'axios';

import { alertSnack } from '@/utils';
import { killApi } from '@/axios';

import { IUser } from '@/interfaces';

export interface AuthState {
    authenticated: boolean;
    user?: IUser;
}

const Auth_INITIAL_STATE: AuthState = {
    authenticated: false,
}

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const router = useRouter();

    const { data, status } = useSession();

    const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

    useEffect(() => {
        if (status === 'authenticated') {
            dispatch({ type: '[Auth] - Login', payload: data.user! as IUser })
        }
    }, [data, status])

    useEffect(() => {
        if (status === 'authenticated' && !router.asPath.includes("/auth")) {
            alertSnack(`Welcome ${data.user?.name!}`, 'success');
        }
    }, [status])


    const loginUser = async (email: string, password: string) => {
        try {
            await killApi.post('/recaptcha');
            const resp = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });
            if (resp?.error) {
                alertSnack('Invalid credentials', 'error');
            } else {
                router.reload();
            }
            return;
        } catch (error) {
            alertSnack('Select captcha.', 'warning');
        }
    }


    const registerUser = async (name: string, email: string, password: string) => {
        try {
            await killApi.post('/recaptcha')
        } catch (error) {
            return alertSnack('Select captcha.', 'warning');
        }

        try {
            const { data } = await killApi.post('/user/register', { name, email, password })
            dispatch({ type: '[Auth] - Login', payload: data.user });
            await signIn('credentials', { email, password });
        } catch (error) {
            if (isAxiosError(error)) {
                return alertSnack(error.response?.data.message, 'error')
            }
        }
    }

    const logoutUser = () => {
        dispatch({ type: '[Auth] - Logout' });
        signOut();
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            loginUser,
            logoutUser,
            registerUser
        }}>
            {children}
        </AuthContext.Provider>
    )
};