import { IGameServer } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
    gameservers: IGameServer[];
    isLoading: boolean,
}


export const GsContext = createContext({} as ContextProps);