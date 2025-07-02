import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export async function WorkspaceMiddleware(req: NextRequest) {
   const secret = process.env.NEXTAUTH_SECRET;
   if (!secret) {
    console.error("Error: NEXTAUTH_SECRET environment variable is not set.")
    return NextResponse.next()
   }

   const token = await getToken({req, secret});
   if (!token || !token.sub) {
    return NextResponse.redirect(`${process.env.BASE}/login`)
   }
}