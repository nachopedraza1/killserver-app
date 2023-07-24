import { createContext } from 'react';
import { IUser } from '@/interfaces';


interface ContextProps {
    authenticated: boolean;
    recaptcha: boolean;
    user?: IUser;

    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: undefined }>
    handleRecaptcha: (token: string | null) => Promise<void>
    logoutUser: () => void
}


export const AuthContext = createContext({} as ContextProps);