import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "./password";


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
        })
    ],
    
    
}