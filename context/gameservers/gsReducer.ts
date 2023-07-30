import { GsState } from './';
import { IGameServer } from '../../interfaces/interfaces';


type GsActionType =
    | { type: '[Gs] - LoadGameServers', payload: { gameservers: IGameServer[], isLoading: boolean } }


export const gsReducer = (state: GsState, action: GsActionType): GsState => {

    switch (action.type) {
        case '[Gs] - LoadGameServers':
            return {
                ...state,
                gameservers: action.payload.gameservers,
                isLoading: action.payload.isLoading
            }

        default:
            return state;
    }

}