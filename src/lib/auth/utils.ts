import {DefaultSession, getServerSession, NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'

import {getDb} from "@/lib/db";

// declare module "next-auth" {
//     interface Session {
//         user: User
//     }
// }


export type AuthSession = {
    session: {
        user: {
            id: string; name?: string; email?: string;
        };
    } | null;
};

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
        maxAge: 4 * 60 * 60
    }, pages: {
        signIn: '/login',
    }, callbacks: {
        session: ({session, token, user}) => {
            console.log('token in session callback:', token);
            session.user = (token as any).user;
            console.log('Session callback:', session);
            return session;
        }, jwt: ({user, token, account}) => {

            console.log('user-', user)
            console.log('account-', account)
            console.log('token-', token)
            if (user) {

                console.log('yes user-------')
                token.user = user

            }


            console.log('token--', token)
            return token;

        },


    }, secret: process.env.AUTH_SECRET, providers: [CredentialsProvider({
        name: 'signin', credentials: {
            email: {label: 'email', type: 'email', placeholder: 'ramdas@gmail.com'},
            password: {label: 'password', type: 'password'}
        }, async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) return null;

            try {
                const {db, client} = await getDb()
                console.log(' use1')

                const user = await db.collection('users').findOne({email: credentials.email,role:'Volunteer'});
                // const user = await (await db).collection('users').findUnique({
                //     where: {email: credentials.email}
                // }


                if (!user) return null;
                console.log('searching user--', user)

                // const hash=await bcrypt.hash(credentials.password,10)
                const isvalid = await bcrypt.compare(credentials.password, user.password)
                if (!isvalid) throw new Error('Wrong password');

                return user as any
            } catch (error: any) {
                console.error('Error in authorize callback:', error);
                return null;
            }
        }
    })

    ]
};
