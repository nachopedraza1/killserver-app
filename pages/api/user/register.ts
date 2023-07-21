import type { NextApiRequest, NextApiResponse } from 'next';

import bcrypt from 'bcryptjs';

import { isEmail } from '@/utils/validations';
import { User } from '@/models';
import { db } from '@/db';

import { IUser } from '@/interfaces';

type Data =
    | { message: string }
    | { user: IUser }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'POST':
            return registerUser(req, res);

        default:
            res.status(200).json({ message: 'Invalid Method' });
    }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { name = '', email = '', password = '' } = req.body;

    if (name.length <= 2) return res.status(400).json({ message: 'Bad request - name' })
    if (isEmail(email)) return res.status(400).json({ message: 'Bad request - email' })
    if (password.length < 6) return res.status(400).json({ message: 'Bad request - password' })

    await db.connect();

    const isExist = await User.findOne({ email });

    if (isExist) {
        await db.disconnect();
        return res.status(400).json({ message: 'email already exists' })
    }

    const user = new User({ name, email, password: bcrypt.hashSync(password) })

    try {
        await user.save({ validateBeforeSave: true });
        await db.disconnect();
    } catch (error) {
        return res.status(400).json({ message: 'Error, check logs in server.' })
    }

    const { _id } = user;

    return res.status(200).json({ user: { _id, name, email } });

} 