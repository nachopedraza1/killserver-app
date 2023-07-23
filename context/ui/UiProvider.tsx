import { FC, ReactNode, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    openServerModal: boolean;
}


const Ui_INITIAL_STATE: UiState = {
    openServerModal: false,
}


export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    const toggleModal = () => {
        dispatch({ type: '[Ui] - toggleModal' })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            toggleModal
        }}>
            {children}
        </UiContext.Provider>
    )
};