

export interface IGameServer {
    name: string,
    urlWebsite: string,
    vulnerabilities: ['Cross-site request', 'Cross-site scripting', 'SQLI', 'DDOS', 'Loggin Buffer'],
    game: ['Mu Online', 'Cabal Online', 'Lineage 2', 'World of Warcraft', 'Aion Online'],
}

export interface IUser {
    _id: string,
    name: string,
    email: string,
    password?: string,
}