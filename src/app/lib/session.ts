import { getServerSession, Session } from "next-auth";
import { authOptions } from "./auth/options";
import { NextRequest, NextResponse } from "next/server";
import { getSearchParams } from "@/packages/utils/functions/url";

interface WithSessionHandler {
	({
    request,
    params,
    searchParams,
    session,
  }: {
    request: Request;
    params: Record<string, string>;
    searchParams: Record<string, string>;
    session: Session;
  }): Promise<Response>;
}

export const withSession = async (handler: WithSessionHandler) => {
	return async (request: NextRequest, { params }: { params: Record<string, string> }) => {
		try {
		const session = await getSession();
		if (!session) {
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
		}
		const searchParams = getSearchParams(request.url);
		return await handler({ request, params, searchParams, session });
	} catch (error) {
		console.error("Error in withSession: ", error);
		return NextResponse.json({ message: "Failed to fetch session" }, { status: 500 });
	}
	}
}


export function getSession() {
	return getServerSession(authOptions) as Promise<Session>;
}