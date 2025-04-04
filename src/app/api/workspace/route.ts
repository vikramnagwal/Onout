import { getSession } from "@/app/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
   const body = request.json();
   const session = await getSession()
   console.log("Session:", session);
   console.log("Request body:", request.cookies);
//    console.log("Workspace name:", body);
   
   return NextResponse.json(0)
}