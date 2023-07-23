import { UiState } from './';

type UiActionType =
    | { type: '[Ui] - toggleModal' }


export const uiReducer = (state: UiState, action: UiActionType): UiState => {

    switch (action.type) {
        case '[Ui] - toggleModal':
            return {
                ...state,
                openServerModal: !state.openServerModal
            }

        default:
            return state;
    }

}