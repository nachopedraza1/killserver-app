import { dbUsers } from "@/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
    interface User {
        id?: string
        _id: string
    }
};

export const authOptions: NextAuthOptions = {
    providers: [
        Credentials({
            name: 'custom login',
            credentials: {
                email: { label: 'Correo:', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'Contraseña:', type: 'password', placeholder: 'Contraseña' }
            }, async authorize(credentials) {
                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);
            },
        })
    ],

    session: {
        maxAge: 1800, /// 30m
        strategy: 'jwt',
        updateAge: 600, // 10m
    },

    pages: {
        signIn: '/auth/login',
        newUser: '/auth/register'
    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDbUser(user?.email || '', user?.name || '');
                        break;

                    case 'credentials':
                        token.user = user;
                        break;
                }

            }
            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions);