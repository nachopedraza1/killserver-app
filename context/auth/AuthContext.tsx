import { createContext } from 'react';
import { IUser } from '@/interfaces';


interface ContextProps {
    authenticated: boolean;
    user?: IUser;
}


export const AuthContext = createContext({} as ContextProps);