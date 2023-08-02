import { FC, ReactNode, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
    sidebarOpen: boolean;
    openServerModal: boolean;
}

const Ui_INITIAL_STATE: UiState = {
    sidebarOpen: false,
    openServerModal: false,
}

export const UiProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

    const toggleModal = () => {
        dispatch({ type: '[Ui] - toggleModal' })
    }

    const toggleSideBar = () => {
        dispatch({ type: '[Ui] - toggleSidebar' })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            toggleModal,
            toggleSideBar
        }}>
            {children}
        </UiContext.Provider>
    )
};