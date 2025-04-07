import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT, JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		user: {
			id: string;
			email: string;
			username: string;
			isVerified: boolean;
			accessToken?: string;
			refreshToken?: string;
		} & DefaultUser;
	}
}

declare module "next-auth" {
	interface User extends DefaultUser {
		id: string;
		email: string;
		username: string;
		isVerified: boolean;
		accessToken?: string;
		refreshToken?: string;
	}

	interface Session {
		user: {
			id: string;
			email: string;
			isVerified: boolean;
			username?: string;
		} & DefaultSession;
	}
}
