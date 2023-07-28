import type { NextApiRequest, NextApiResponse } from 'next';

import { hostings, games, attacks } from '@/utils';
import { GameServer } from '@/models';
import { db } from '@/db';

import { IGameServer } from '@/interfaces';

type Data =
    | { message: string }
    | IGameServer[]
    | IGameServer



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

    const { name = '', urlWebsite = '', vulnerabilities = [], game = '', host = '' } = req.body;

    if (name.length <= 2 || name.length > 15) return res.status(400).json({ message: 'Bad request' })

    if (urlWebsite.length <= 5 || urlWebsite.length > 36) return res.status(400).json({ message: 'Bad request' })

    if (vulnerabilities.length >= 1) {
        vulnerabilities.forEach((vuln: string) => {
            if (!attacks.includes(vuln)) return res.status(400).json({ message: ' Invalid vulnerabilities' })
        })
    }

    if (!hostings.includes(`${host}`)) {
        return res.status(400).json({ message: ' Invalid hosting' })
    }

    if (!games.includes(`${game}`)) {
        return res.status(400).json({ message: 'Invalid game' })
    }

    await db.connect();

    const isExist = await GameServer.find({ $or: [{ name }, { urlWebsite }] })

    if (isExist.length >= 1) {
        await db.disconnect();
        return res.status(400).json({ message: "This server's data is already in our database" })
    }

    const gameServer = new GameServer({ name, game, urlWebsite, host, vulnerabilities })
    await gameServer.save();
    await db.disconnect();

    return res.status(200).json({
        name,
        game,
        host,
        urlWebsite,
        vulnerabilities,
    })
}

const getServers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    /* const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = parseInt(req.query.perPage as string, 10) || 10;

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage; */

    await db.connect();
    const servers = await GameServer.find().lean();
    await db.disconnect();

    /* const paginatedData = servers.slice(startIndex, endIndex) */

    return res.status(200).json(servers)
}