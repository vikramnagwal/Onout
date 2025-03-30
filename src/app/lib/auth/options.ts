import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import { decryptPassword, hashPassword } from "./password";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../db";


const CustomPrismaAdapter = (p: PrismaClient) => {
    return {
        ...PrismaAdapter(p),
        createUser: async (data: any) => {
            return p.user.create({
                data: {
                    ...data,
                    hashPassword: await hashPassword(data.password), 
                }
            })
        }
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "anom",
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
                if (!user.isVerified) {
                    throw new Error("User not verified")
                }
                const isValid = await decryptPassword({ password, passwordHash: user.password });

                if (!isValid) {
                    throw new Error("Invaid Credentials")
                }
                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    isVerified: user.isVerified,
                }
            }
        })
    ],
    adapter: CustomPrismaAdapter(prisma),
    session: {strategy: "jwt"},
}