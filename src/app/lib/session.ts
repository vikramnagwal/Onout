import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/options";
import { AnomApiError } from "./error";

interface WithSessionOptions {
	req: Request;
	params: Record<string, string>;
	searchParams: Record<string, string>;
	session: Session;
}

export function getSession() {
	return getServerSession(authOptions) as Promise<Session>;
}
