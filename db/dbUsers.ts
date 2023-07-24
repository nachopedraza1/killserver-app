import bcrypt from 'bcryptjs';
import { User } from '@/models';
import { IUser } from '@/interfaces';
import { db } from "./"

export const checkUserEmailPassword = async (email: string, password: string): Promise<IUser | null> => {

    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if (!user) {
        await db.disconnect();
        return null;
    }

    if (!bcrypt.compareSync(password, user.password!)) {
        return null;
    }

    const { _id, name } = user;

    return { _id, name, email }
}


export const oAuthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });

    if (user) {
        await db.disconnect();
        const { _id, name, email } = user;
        return { _id, name, email }
    }

    const newUser = new User({ name: oAuthName, email: oAuthEmail, password: '@' })
    await newUser.save();
    await db.disconnect();

    const { _id, name, email } = newUser;
    return { _id, name, email }
}