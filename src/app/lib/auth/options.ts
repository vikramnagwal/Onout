import { NextAuthOptions, User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { decryptPassword, hashPassword } from "./password";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import { UserProps } from "../types";
import { prisma } from "../db";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			id: "credentials",
			name: "Anom",
			type: "credentials",
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			authorize: async (credentials, req) => {
				if (!credentials) {
					throw new Error("no credentials");
				}

				const { email, password } = credentials;
				if (!email || !password) {
					throw new Error("Missing credentials");
				}
				const user = await prisma.user.findUnique({
					where: { email },
					select: {
						id: true,
						username: true,
						email: true,
						password: true,
						isVerified: true,
					},
				});

				if (!user || !user.password) {
					throw new Error("User not exists");
				}

				const isValid = await decryptPassword({
					password,
					passwordHash: user.password,
				});
				if (!isValid) {
					throw new Error("Invalid Credentials");
				}
				return {
					id: user.id,
					email: user.email,
					username: user.username || "",
					isVerified: user.isVerified,
				};
			},
		}),
	],
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
	jwt: { maxAge: 30 * 24 * 60 * 60 }, // 30 days
	theme: { colorScheme: "auto" },
	cookies: {
		sessionToken: {
			name: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}.next-auth.session-tokens`,
			options: {
				httpOnly: true,
				sameSite: "lax",
				path: "/",
				domain: process.env.NEXTAUTH_URL ?? undefined,
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
			console.log("signIn", user, account, profile);

			if (!user || !user.email) {
				return false;
			}

			if (account?.provider === "google") {
				const userExists = await prisma.user.findUnique({
					where: { email: user.email },
					select: {
						id: true,
						email: true,
						username: true,
						isVerified: true,
					},
				});
				if (userExists) {
					return true;
				}

				const createdUser = await prisma.user.create({
					data: {
						email: user.email,
						username: user.email.split("@")[0],
						isVerified: true,
					},
				});

				await prisma.verificationToken.deleteMany({
					where: { user: { email: user.email } },
				});

				await prisma.oAuth.create({
					data: {
						provider: account.provider,
						providerAccountId: account.providerAccountId,
						user: {
							connect: { email: user.email },
						},
						expires: account.expires_at,
						scope: account.scope,
						token_type: account.token_type,
						id_token: account.id_token,
						session_state: account.session_state,
						access_token: account.access_token,
						refresh_token: account.refresh_token,
					},
				});
				if (!createdUser) {
					throw new Error("Failed to create user");
				}

				return true;
			}
			const userExists = await prisma.user.findUnique({
				where: { email: user.email },
				select: {
					id: true,
					email: true,
					username: true,
					isVerified: true,
				},
			});
			if (!userExists) {
				throw new Error("User not exists");
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
			console.log("jwt", token, user, trigger);
			if (user) {
				token.user = {
					id: user.id ?? token.sub ?? "",
					email: user.email ?? "",
					username: user.username ?? "",
					isVerified: (user as any).isVerified ?? false,
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
						username: refreshedUser.username || "",
						isVerified: refreshedUser.isVerified,
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
