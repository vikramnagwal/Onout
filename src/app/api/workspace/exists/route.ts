import { prisma } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

// GET: /api/workspace/exists?query={workspace_name} - check if a workspace exists.

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query") || "";

	if (!query) {
		return NextResponse.json(
			{ message: "Please provide a query" },
			{ status: 400 },
		);
	}

	try {
		const workspaceExists = await prisma.workspace.findUnique({
			where: {
				slug: query,
			},
			select: {
				id: true,
			},
		});

		if (!workspaceExists) {
			return NextResponse.json(0); // true (good to go)
		}
		return NextResponse.json(1);
	} catch (_) {
		return NextResponse.json(
			{ message: "Error checking workspace existence" },
			{ status: 500 },
		);
	}
}
