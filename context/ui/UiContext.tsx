import { createContext } from 'react';


interface ContextProps {
    sidebarOpen: boolean,
    openServerModal: boolean;

    toggleModal: () => void;
    toggleSideBar: () => void;
}


export const UiContext = createContext({} as ContextProps);