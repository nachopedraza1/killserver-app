
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

export interface Games {
    game: ['Mu Online', 'Cabal Online', 'Lineage 2', 'World of Warcraft', 'Aion Online']
}

export interface Hostings {
    hosts:
    ['Tempest',
        'OVH',
        'ScalaCube',
        'Fozzy',
        'Amazon',
        'HostHavoc',
        'Sparkedhost',
        'Clouding.io',
        'Google Cloud',
        'Hostinger',
        "not listed-don't know"
    ]
}

export interface Vulnerabilities {
    vulnerabilities: ['', 'Cross-site request', 'Cross-site scripting', 'SQLI', 'DDOS', 'Loggin Buffer']
}