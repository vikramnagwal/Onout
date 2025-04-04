import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';

    if (!query) {
        return NextResponse.json({ message: "Please provide a query"}, { status: 400 });
    }

    try {
         const workspaceExists = await prisma.workspace.findUnique({
        where: {
            name: query,
        },
        select: {
            id: true,
        }
    })

        if (!workspaceExists) {
            return NextResponse.json(0)
        }
        return NextResponse.json(1)
    } catch (_) {
        return NextResponse.json({ message: "Error checking workspace existence" }, { status: 500 });
    }
}