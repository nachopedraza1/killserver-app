import { FC, useReducer, ReactNode, useEffect } from 'react';
import { useGameServers } from '@/hooks';

import { GsContext, gsReducer } from './';

import { IGameServer } from '@/interfaces';

export interface GsState {
    gameservers: IGameServer[];
    isLoading: boolean,
}


const Gs_INITIAL_STATE: GsState = {
    gameservers: [],
    isLoading: false,
}


export const GsProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(gsReducer, Gs_INITIAL_STATE);

    const { gameservers, isLoading } = useGameServers('/gameservers');

    useEffect(() => {
        dispatch({ type: '[Gs] - LoadGameServers', payload: { gameservers, isLoading } })
    }, [isLoading])

    return (
        <GsContext.Provider value={{
            ...state
        }}>
            {children}
        </GsContext.Provider>
    )
};