import { createContext } from 'react';


interface ContextProps {
    openServerModal: boolean;
    
    toggleModal: () => void
}


export const UiContext = createContext({} as ContextProps);