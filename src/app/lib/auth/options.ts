import { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { decryptPassword, hashPassword } from "./password";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { prisma } from "../db";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { UserProps } from "../types";


const CustomPrismaAdapter = (p: PrismaClient) => {
    return {
        ...PrismaAdapter(p),
        createUser: async (data: any) => {
            const user = await p.user.create({
                data: {
                    ...data,
                    hashPassword: await hashPassword(data.password), 
                }
            });
            
            return {
                ...user,
                emailVerified: user.isVerified ? new Date() : null
            };
        }
    }
}

export const authOptions: NextAuthOptions = {
    debug: true,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

        }),
        CredentialsProvider({
            id: "credentials",
            name: "anom/ymous",
            type: "credentials",
            credentials: {
                email: ({ type: "email"}),
                password: ({ type: "password"}),
            },
            authorize: async (credentials, req) => {
                if (!credentials) {
                    throw new Error("no credentials")
                }

                const { email, password } = credentials;
                if (!email || !password) {
                    throw new Error("Missing credentials")
                }
                const user = await prisma.user.findUnique({
                    where: { email },
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        password: true,
                        isVerified: true,
                    }
                });

                if (!user || !user.password) {
                    throw new Error("User not exists")
                }
                // check on this
                if (!user.isVerified) {
                    throw new Error("User not verified")
                }
                const isValid = await decryptPassword({ password, passwordHash: user.password });

                if (!isValid) {
                    throw new Error("Invalid Credentials")
                }
                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    password: user.password,
                    isVerified: user.isVerified,
                }
            }
        })
    ],
    adapter: CustomPrismaAdapter(prisma),
    session: { strategy: "jwt"},
    secret: process.env.NEXTAUTH_SECRET,
    jwt: { maxAge: 30 * 24 * 60 * 60 }, // 30 days
    theme: { colorScheme: "auto" },
    cookies: {
        sessionToken: {
            name: `${process.env.NODE_ENV === "production" ? "__Secure" : "" }.next-auth.session-tokens`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                domain: process.env.NEXTAUTH_URL ?? undefined,
                secure: process.env.NODE_ENV === "production",
            }
        }
    },
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log({ user, account, profile });

            if (!user || !user.email) {
                return false
            }

            if(account?.provider === "google" || account?.provider === "github") {
               const existedUser = await prisma.user.findUnique({
                where: { email: user.email },
               })
// if user exists and is not verified
               if (existedUser && !existedUser.isVerified) {
                try {
                    await prisma.user.update({
                    where: { id: existedUser.id },
                    data: {
                        emailVerified: new Date(),
                        isVerified: true,
                    }
                })
                 return true
                } catch (error) {
                   throw new Error("Error updating user") 
                }
               } 

               return true;
            }

            const userExists = await prisma.user.findUnique({
                where: { email: user.email },
                select: {
                    id: true,
                    email: true,
                    username: true,
                    password: true,
                    isVerified: true,
                }
            })

            if (!userExists?.isVerified) {
                throw new Error("User not verified")
            }

            if (userExists || profile) {
                return false
            }

            return true
        },
        async jwt({ token, user, trigger }: {
            token: JWT,
            user: User | AdapterUser | UserProps,
            trigger?: "signIn" | "update" | "signUp"
        } ) {
            if (user) {
                token.user = user;
            }
            if (trigger === "update" && user && "email" in user && user.email) {
                const updatedUser = await prisma.user.findUnique({
                    where: { email: user.email },
                })
                if (updatedUser) {
                    token.user = updatedUser;
                } else {
                    throw new Error("User not found during token update");
                }
            }
             return token
        },
        async session({ session, token }) {
            session.user = token.user as UserProps;
            return session
        }
    },
    events: {
        async signIn(message) {
            console.log("User signed in", message)
        }
    }

}