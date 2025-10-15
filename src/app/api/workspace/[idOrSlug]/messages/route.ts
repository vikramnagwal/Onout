import { checkWorkspaceExists } from "@/app/lib/actions/check-workspace-exists-action";
import { getSession } from "@/app/lib/auth/session";
import { prisma } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface Params {
	params: { idOrSlug: string };
}

// GET: /api/workspace/[idOrSlug]/messages - get all messages from workspace
export async function GET(req: NextRequest, { params }: { params: Promise<{idOrSlug: string }>}) {
	
	const workspaceSlug = (await params).idOrSlug;
	const session = await getSession();
	
	// verify user is authenticated
	// check workspace exists and user is a member of the workspace
	// if not return 403
	// if exists fetch messages from database
	// format messages in structured manner

	if (!session) return NextResponse.json({message: "Unauthorized"}, { status: 403 })
		const workspaceExists = await checkWorkspaceExists({name: workspaceSlug});
	if (!workspaceExists) return NextResponse.json({message: "Workspace not found"}, { status: 404 })

		const messages = await prisma.messages.findMany({
			where: {
				workspace: {
					slug: workspaceSlug
				}
			}
		})

	return NextResponse.json({ 
		success: true,
		messages
	}, { status: 200 });
}
