import { prisma } from "@/app/lib/db";
import { checkUserExists } from "@/app/lib/postgres/check-user-exists";
import { getSession } from "@/app/lib/session";
import { CreateWorkspaceSchema } from "@/app/lib/zod/schema/workspace-schema";
import { createDomainfromId } from "@/packages/utils/functions/domain";
import { getSessionOrThrow } from "@/packages/utils/functions/workspace";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// GET: /api/workspace - fetch workspace of user
export async function GET(request: NextRequest) {
	const session = await getSessionOrThrow();
	const userId = session?.user?.id;

	if (!userId) {
		return NextResponse.json(
			{ message: "Unauthorizes: Session Expired or Invalid" },
			{ status: 401 },
		);
	}

	try {
		const workspace = await prisma.workspace.findUnique({
			where: {
				userId,
			},
			select: {
				id: true,
				slug: true,
				plan: true,
				type: true,
				user: {
					select: {
						email: true,
						emailVerified: true,
					},
				},
			},
		});
		return NextResponse.json(workspace, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ message: "failed to fetch workspace" },
			{ status: 500 },
		);
	}
}

// POST: /api/workspace - creates a new workspace
export async function POST(request: NextRequest) {
	const session = await getSession();
	if (!session) {
		return NextResponse.json(
			{ message: "Session Expired! Please login again" },
			{ status: 401 },
		);
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
	const domain = createDomainfromId(workspaceName);

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
		// check if workspace exists
		// if exists return the workspace
		// else create a new workspace

		const existingWorkspace = await prisma.workspace.findFirst({
			where: {
				OR: [{ slug: workspaceName }, { domain: domain }, { userId: userId }],
			},
		});

		if (existingWorkspace) {
			return NextResponse.json(
				{existingWorkspace, message: "Workspace already exists" },
				{ status: 200 },
			);
		}

		// create a new workspace
		// if not exists
		const workspace = await prisma.workspace.create({
			data: {
				slug: workspaceName,
				domain: domain,
				user: {
					connect: {
						id: userId,
					},
				},
			},
			select: {
				id: true,
				slug: true,
				plan: true,
				type: true,
			},
		});
		console.log("Workspace created successfully", workspace);

		return NextResponse.json(
			{ message: "workspace created successfully", workspace },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to create workspace", error },
			{ status: 500 },
		);
	}
}
