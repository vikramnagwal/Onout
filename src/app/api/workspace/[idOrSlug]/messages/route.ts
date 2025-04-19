import { prisma } from '@/app/lib/db';
import { Workspace } from './../../../../lib/types';
import { WorkspaceNameSchema } from "@/app/lib/zod/schema/workspace-schema";
import { getSessionOrThrow } from "@/packages/utils/functions/workspace";
import { NextRequest, NextResponse } from "next/server";
import { EncryptedMessageSchema, MessageSchema } from '@/app/lib/zod/schema/messages-schema';
import { getIp } from '@/packages/utils/functions/get-ip';

interface Params {
  params: { idOrSlug: string };
}

// GET: /api/workspace/[idOrSlug]/messages - get all messages from workspace
// don't allow get request 
export async function GET(request: NextRequest, { params } : Params) {
    const { idOrSlug } = params;
    const session = await getSessionOrThrow();
    const userId = session?.user?.id;

    // check is workspace name valid
    const workspaceName = await WorkspaceNameSchema.parseAsync(idOrSlug)
    if (!workspaceName) {
        return NextResponse.json({ message: "Invalid workspace name" }, { status: 400 });
    }

    // validate sessions
    if (!session) {
        return NextResponse.json({ message: "Session Expired! Please login again" }, { status: 401 });
    }
    // check if user is the owner of the workspace
    try {
        const messages = await prisma.workspace.findFirst({
        where: {
            slug: workspaceName.slug,
            userId: userId,
        },
        select: {
            Messages: true,
        }
    })
        if (!messages) {
            return NextResponse.json({ message: "No messages found" }, { status: 404 });
        }
        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        console.error("Error fetching messages: ", error);
        return NextResponse.json({ message: "Failed to fetch messages" }, { status: 500 });  
    }
}
