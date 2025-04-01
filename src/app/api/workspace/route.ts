import { NextRequest, NextResponse } from 'next/server';

export default async function GET(req: NextRequest) {
    const url = req.nextUrl.clone()
        return NextResponse.json({ message: "hello world", url })
}
