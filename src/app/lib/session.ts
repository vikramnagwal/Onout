import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/options";

export function getSession() {
    return getServerSession(authOptions) as Promise<Session>;
}