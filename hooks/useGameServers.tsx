import useSWR, { SWRConfiguration } from "swr";
import { IGameServer } from "@/interfaces";


export const useGameServers = (url: string, config: SWRConfiguration = {}) => {

    const { data, error, isLoading } = useSWR<IGameServer[]>(`/api${url}`, config)

    return {
        gameservers: data || [],
        isLoading,
        error,
    }
}