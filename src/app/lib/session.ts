import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/options";
import { getSearchParams } from "@/packages/utils/functions/url";
import { NextRequest } from "next/server";

interface WithSessionHandler {
	({
	request,
	params,
	session,
	searchParams
	}: {
		request: NextRequest;
		params: Record<string, string>;
		session: Session;
		searchParams: URLSearchParams; 
	}): Promise<Response>;
}

export function getSession() {
	return getServerSession(authOptions) as Promise<Session>;
}


export async function withSession(handler: WithSessionHandler, { params = {} }: { params: Record<string, string> | undefined },) {
	try {
		const session = await getSession();
		if (!session?.user) {
			return new Response("Unauthorized: Login required", { status: 401 });
		}

		const searchParams = getSearchParams(request)
		return { request, searchParams, params, session }
	} catch (error) {
		console.error("Error in withSession:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}