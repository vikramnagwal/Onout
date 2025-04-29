import { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { decryptPassword } from "./password";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { UserProps } from "../types";
import { prisma } from "../db";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { authorizeSchema } from "../zod/schema/auth-schema";
import { PrismaClient } from "@prisma/client";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

const CustomPrismaAdapter = (p: PrismaClient) => {
	return {
		...PrismaAdapter(p),
		createUser: async (data: any) => {
			return await p.user.create({
				data: {
					email: data.email,
					emailVerified: data.emailVerified || false,
					image: data.image,
					name: data.name || undefined,
				},
			});
		},
	};
};

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID as string,
			clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
		}),
		CredentialsProvider({
			id: "credentials",
			name: "OnoutCredentials",
			type: "credentials",
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			authorize: async (credentials, request) => {
				if (!credentials) {
					throw new Error("no credentials");
				}

				const { email, password } =
					await authorizeSchema.parseAsync(credentials);

				const user = await prisma.user.findUnique({
					where: { email },
					select: {
						id: true,
						name: true,
						email: true,
						hashedpassword: true, // fix naming convension
						emailVerified: true,
					},
				});

				if (!user || !user.hashedpassword) {
					throw new Error("Unauthorized");
				}

				const isValidPassword = await decryptPassword({
					password,
					passwordHash: user.hashedpassword,
				});
				if (!isValidPassword) {
					throw new Error("Invalid Credentials");
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name || "",
					emailVerified: user.emailVerified,
				};
			},
		}),
	],
	adapter: CustomPrismaAdapter(prisma),
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
	jwt: { maxAge: 30 * 24 * 60 * 60 }, // 30 days
	theme: { colorScheme: "auto" },
	cookies: {
		sessionToken: {
			name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				domain: VERCEL_DEPLOYMENT
					? `.${process.env.NEXT_PUBLIC_DOMAIN}`
					: undefined,
				secure: process.env.NODE_ENV === "production",
			},
		},
	},
	pages: {
		signIn: "/login",
		error: "/login",
	},
	callbacks: {
		async signIn({ user, account, profile }) {
			if (!user || !user.email) {
				return false;
			}

			if (account?.provider === "google") {
				const userExists = await prisma.user.findUnique({
					where: { email: user.email },
					select: {
						id: true,
						email: true,
						name: true,
						emailVerified: true,
					},
				});

				if (!userExists || !profile) {
					return true;
				}

				try {
					await prisma.user.update({
						where: { id: userExists.id },
						data: {
							name: user.name || userExists.name,
							emailVerified: true,
						},
					});
				} catch (error) {
					throw new Error("Error updating user");
				}

				return true;
			}
			const userExists = await prisma.user.findUnique({
				where: { email: user.email },
				select: {
					id: true,
					email: true,
					name: true,
					emailVerified: true,
				},
			});
			if (!userExists) {
				throw new Error("Invalid Credentials");
			}
			return true;
		},
		async jwt({
			token,
			user,
			trigger,
		}: {
			token: JWT;
			user: User | AdapterUser | UserProps;
			trigger?: "signIn" | "update" | "signUp";
		}) {
			if (user) {
				token.user = {
					id: user.id ?? token.sub ?? "",
					email: user.email ?? "",
					name: user.name ?? "",
					emailVerified: (user as any).isVerified ?? false,
				};
			}
			if (trigger === "update") {
				const refreshedUser = await prisma.user.findUnique({
					where: { id: token.sub },
				});
				if (refreshedUser) {
					token.user = {
						id: refreshedUser.id,
						email: refreshedUser.email,
						name: refreshedUser.name || "",
						emailVerified: refreshedUser.emailVerified,
					};
				} else {
					return token;
				}
			}
			return token;
		},

		async session({ session, token }) {
			return {
				...session,
				user: {
					// @ts-ignore
					...(token || session).user,
				},
				expires: session.expires,
			};
		},
	},
};
