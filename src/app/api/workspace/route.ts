import { AnomError } from "@/app/lib/error";
import { prisma } from "@/app/lib/db";
import { checkUserExists } from "@/app/lib/postgres/check-uses-exists";
import { getSession } from "@/app/lib/session";
import { createWorkspaceSchema } from "@/app/lib/zod/schema/workspace-schema";
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
			uniquePageLink: true,
		},
	});

	return NextResponse.json(workspaces, { status: 200 });
}

// POST: /api/workspace creates a new workspace
export async function POST(request: NextRequest) {
	const session = await getSession();
	console.log("session", session);
	const user = await prisma.oAuth.findFirst({
		where: {
			providerAccountId: session?.user?.id,
		},
      select: {
         userId: true,
         user: {
            select: {
               email: true,
               id: true,
               username: true,
            },
         }
      }
	});
	console.log("user", user);
	return NextResponse.json(0);
	if (!session) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}
	const userId = session?.user?.email;
	if (!userId) {
		return NextResponse.json(
			{ message: "Session Expired or Unauthorized User" },
			{ status: 401 },
		);
	}

	const { name: workspaceName } = await createWorkspaceSchema.parseAsync(
		await request.json(),
	);
	if (!workspaceName || typeof workspaceName !== "string") {
		return NextResponse.json(
			{ message: "Invalid workspace name" },
			{ status: 400 },
		);
	}

	//   check if workspace already exists
	const userExists = await checkUserExists(userId);
	if (!userExists) {
		throw new Error("Session Expired or Invalid Token");
	}

	try {
		const workspace = await prisma.workspace.create({
			data: {
				name: workspaceName,
				uniquePageLink: workspaceName.replace(/\s+/g, "-").toLowerCase(),
				user: {
					connect: {
						email: tokens, // tokens is unstructured and unpredicted here rewrite this logic
					},
				},
			},
		});

		return NextResponse.json(
			{ message: "workspace created successfully", workspace },
			{ status: 201 },
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to create workspace" },
			{ status: 500 },
		);
	}
}
