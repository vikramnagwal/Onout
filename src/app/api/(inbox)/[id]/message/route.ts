import { encryptMessages } from '@/packages/utils/functions/messages';
import { prisma } from "@/app/lib/db";
import { EncryptedMessageSchema } from "@/app/lib/zod/schema/messages-schema";
import { getIp, getMessageSource } from "@/packages/utils/functions/get-ip";
import { getSearchParams } from "@/packages/utils/functions/url";
import { NextRequest, NextResponse } from "next/server";


type Params = {
    id: string;
};

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


// POST: /api/[id]/messages - create a new message in workspace
export async function POST(request: NextRequest, { params }: { params: Promise<{id: string}>}) {

    const ip = await getIp(request);
    const messageSource = await getMessageSource(request);
    console.log("browser: ", messageSource); // remove this line after testing
    const { id: slug } = await params;
    const { data } = await request.json();
    console.log("Encrypted message: ", data); // remove this line after testing
    return 0
    const { encryptedMessage  } = await EncryptedMessageSchema.parseAsync(await request.json());
    console.log("Encrypted message: ", encryptedMessage);
 return true
    try {   
        const message = await prisma.messages.create({
            data: {
                content: encryptedMessage,
                IpAddress: ip,
                source: messageSource,

                workspace: {
                    connect: {
                        slug: slug,
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