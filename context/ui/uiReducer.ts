import { UiState } from './';

type UiActionType =
    | { type: '[Ui] - toggleModal' }
    | { type: '[Ui] - toggleSidebar' }


export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - toggleModal':
            return {
                ...state,
                openServerModal: !state.openServerModal
            }
        case '[Ui] - toggleSidebar':
            return {
                ...state,
                sidebarOpen: !state.sidebarOpen
            }

        default:
            return state;
    }

}