import { prisma } from "@/app/lib/db";
import { EncryptedMessageSchema } from "@/app/lib/zod/schema/messages-schema";
import { getIp, getMessageSource } from "@/packages/utils/functions/get-ip";
import { getSearchParams } from "@/packages/utils/functions/url";
import { getSessionOrThrow } from "@/packages/utils/functions/workspace";
import { NextRequest, NextResponse } from "next/server";

// GET: /api/inbox/message?id=1234 - get message by id
export async function GET(request: NextRequest) {
    const messageId = getSearchParams(request, "id");
    
    try {
        const message = await prisma.messages.findUnique({
            where: {
                id: messageId,
            },
            select: {
                content: true,
                clicks: true,
                createdAt: true,
                views: true,
                source: true,
                slug: true,
            }
        })
        return NextResponse.json(message, { status: 200 });
    } catch (error) {
     console.error("Error fetching message: ", error);
        return NextResponse.json({ message: "Failed to fetch message" }, { status: 500 });   
    }
}
// POST: /api/workspace/[idOrSlug]/messages - create a new message in workspace
export async function POST(request: NextRequest) {

    const ip = await getIp(request);
    const messageSource = await getMessageSource(request);
    const session = await getSessionOrThrow();
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ message: "Session Expired! Please login again" }, { status: 401 });
    }

    const { encryptedMessage } = await EncryptedMessageSchema.parseAsync(request.json());

    try {   
        const message = await prisma.messages.create({
            data: {
                content: encryptedMessage,
                IpAddress: ip,
                source: messageSource,

                workspace: {
                    connect: {
                        userId: userId,
                    },
                },
            }
        })
        return NextResponse.json(message, { status: 201 });
    } catch (error) {
        console.error("Error creating message: ", error);
        return NextResponse.json({ message: "Failed to create message" }, { status: 500 });
    }

}