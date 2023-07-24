import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';


interface Recaptcha {
    success: boolean
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Recaptcha>) {

    const { token = '' } = req.body;

    if (req.method === 'POST') {
        const { data } = await axios.post<Recaptcha>(`https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`);
        if (data.success) {
            return res.status(200).json({ success: true });
        }
        return res.status(400).json({ success: false });
    }

    res.status(400).json({ success: false });
}