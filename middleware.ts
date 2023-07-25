
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, event: NextFetchEvent) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    switch (req.method) {
        case 'GET':
            return NextResponse.next();

        case 'POST':
            if (!session) {
                return new Response(JSON.stringify({ message: 'Unauthorized' }), {
                    status: 401,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            };
            return NextResponse.next();

        default:
            return new Response(JSON.stringify({ message: 'Unauthorized' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    }
}

export const config = {
    matcher: ['/api/gameservers'],
};