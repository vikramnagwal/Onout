import { prisma } from "@/app/lib/db";
import { checkUserExists } from "@/app/lib/postgres/check-user-exists";
import { getSession } from "@/app/lib/session";
import { CreateWorkspaceSchema } from "@/app/lib/zod/schema/workspace-schema";
import { NextRequest, NextResponse } from "next/server";


// GET: /api/workspace fetch all the associated workspaces with user
export async function GET(request: NextRequest) {
	const session = await getSession();
	const userId = session?.user?.email ?? undefined;
	if (!userId) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	const workspaces = await prisma.workspace.findMany({
		where: {
			user: {
				email: userId,
			},
		},
		select: {
			id: true,
			name: true,
		},
	});

	return NextResponse.json(workspaces, { status: 200 });
}

// POST: /api/workspace creates a new workspace
export async function POST(request: NextRequest) {

	const session = await getSession();
	console.log("Session: ", session);
	if (!session) {
		return NextResponse.json({ message: "Session Expired! Please login again" }, { status: 401 });
	}
	const userId = session?.user?.id;
	if (!userId) {
		return NextResponse.json(
			{ message: "Unauthorizes: Session Expired or Invalid" },
			{ status: 401 },
		);
	}

	const { name: workspaceName } = await CreateWorkspaceSchema.parseAsync(
		await request.json(),
	);
	if (!workspaceName || typeof workspaceName !== "string") {
		return NextResponse.json(
			{ message: "Invalid workspace name" },
			{ status: 400 },
		);
	}

	//   check if User exists then proceeds : Extra security check
	const userExists = await checkUserExists(userId);
	if (!userExists) {
		throw new Error("Session Expired or Invalid Token");
	}

	try {
		const workspace = await prisma.workspace.create({
			data: {
				name: workspaceName,
				user: {
					connect: {
						id: userId,
					},
				},
			},
			select: {
				id: true,
				name: true
			}
		});

		return NextResponse.json(
			{ message: "workspace created successfully", workspace},
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to create workspace" },
			{ status: 500 },
		);
	}
}
