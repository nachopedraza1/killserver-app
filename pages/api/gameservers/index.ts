import { IGameServer } from '@/interfaces';
import { GameServer } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/db';

type Data =
    | { message: string }
    | IGameServer[]
    | IGameServer

const servers = ['Mu Online', 'Cabal Online', 'Lineage 2', 'World of Warcraft', 'Aion Online'];
const attacks = ['Cross-site request', 'Cross-site scripting', 'SQLI', 'DDOS', 'Loggin Buffer'];


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getServers(req, res);

        case 'POST':
            return addServer(req, res);

        default:
            return res.status(400).json({ message: 'Invalid method.' })
    }
}


const addServer = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', urlWebsite = '', vulnerabilities = '', game = '' } = req.body;

    if (name.length <= 2) return res.status(400).json({ message: 'Bad request' })
    if (urlWebsite.length <= 5) return res.status(400).json({ message: 'Bad request' })

    if (vulnerabilities.length <= 3 || !attacks.includes(`${vulnerabilities}`)) {
        return res.status(400).json({ message: ' Invalid vulnerabilities' })
    }

    if (game.length <= 2 || !servers.includes(`${game}`)) {
        return res.status(400).json({ message: 'Invalid servertype' })
    }

    await db.connect();

    const isExist = await GameServer.find({ $or: [{ name }, { urlWebsite }] })

    if (isExist.length >= 1) {
        await db.disconnect();
        return res.status(400).json({ message: "this server's data is already in our database" })
    }

    const gameServer = new GameServer({ name, game, urlWebsite, vulnerabilities })
    await gameServer.save();
    await db.disconnect();

    return res.status(200).json({
        name,
        game,
        urlWebsite,
        vulnerabilities,
    })
}

const getServers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect();
    const servers = await GameServer.find().lean();
    await db.disconnect();

    return res.status(200).json(servers)
}