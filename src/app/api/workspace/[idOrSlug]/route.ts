import { prisma } from "@/app/lib/db";
import { getAuthTokenOrThrow, getSessionOrThrow, getUserId } from "@/packages/utils/functions/workspace";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    idOrSlug: string;
}

// GET: /api/workspace/[idOrSlug] = fetch workspace by id or slug
export async function GET(request: NextRequest, { params }: { params: Params}) {
    const { idOrSlug } = params;
    const { userId } = await getUserId();

    try {
        const workspace = await prisma.workspace.findFirst({
            where: {
                OR: [
                    { id: idOrSlug },
                    { slug: idOrSlug, userId }
                ]
            },
            select: {
                id: true,
                slug: true,
                plan: true,
                type: true,
                Messages: true,
                user: {
                    select: {
                        image: true,
                        name: true,
                        email: true,
                        emailVerified: true,
                    }
                }
            }
        })

        return NextResponse.json(workspace, { status: 200 });
    } catch (error: unknown[] | any) {
        if (error.code === "p2002") {
            throw new Error("Workspace already exists with this name");
        } else {
            throw new Error("Failed to fetch workspace");
        }
    }
}

// DELETE: /api/workspace/[idOrSlug] = delete workspace by id or slug
export async function DELETE(request: NextRequest, { params }: { params: Params}) {
    const { idOrSlug } = params;
    const { userId } = await getUserId();

    try {
        await prisma.workspace.deleteMany({
            where: {
                OR: [
                    { id: idOrSlug },
                    { slug: idOrSlug, userId }
                ]
            }
        })

        return NextResponse.json({message: "workspace deleted succesfully"}, { status: 200 });
    } catch (error) {
        throw new Error("Failed to delete workspace");
    }
}