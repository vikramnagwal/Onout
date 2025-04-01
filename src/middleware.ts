import { NextResponse, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const path = req.nextUrl
    if (token && (path.pathname.startsWith("/login"))) {
        const url = req.nextUrl.clone()
        url.pathname = "/"
        return NextResponse.redirect(url)
    }
  return NextResponse.next()
}

export const config = { matcher: ["/login", "/register"] }