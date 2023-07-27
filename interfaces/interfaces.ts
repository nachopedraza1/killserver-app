
export interface IGameServer {
    name: string,
    urlWebsite: string,
    vulnerabilities: Vulnerabilities,
    host: Hostings,
    game: Games;
}

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password?: string,
}

export type Games = 'muonline' | 'cabal' | 'lineage2' | 'worldofwarcraft' | 'aion'

export type Hostings =
    | 'Tempest'
    | 'OVH'
    | 'ScalaCube'
    | 'Fozzy'
    | 'Amazon'
    | 'HostHavoc'
    | 'Sparkedhost'
    | 'Clouding.io'
    | 'Google Cloud'
    | 'Hostinger'
    | "not listed-don't know"

export type Vulnerabilities = ['', 'Cross-site request', 'Cross-site scripting', 'SQLI', 'DDOS', 'Loggin Buffer']
