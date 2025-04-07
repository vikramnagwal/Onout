"use server";

import { WorkspaceFormSchema } from "@/packages/ui/workspace/create-workspace-form";
import { actionClient } from "./safe-action";
import { prisma } from "../db";
import { getSession } from "../session";
import { checkWorkspaceExists } from "./check-workspace-exists-action";

export const createWorkspace = actionClient
	.schema(WorkspaceFormSchema)
	.action(async ({ parsedInput }) => {
		const { name: workspaceName } = parsedInput;
		const session = await getSession();
		// Check if the workspace already exists
		const workspaceId = await checkWorkspaceExists(workspaceName);
		if (workspaceId) {
			return {
				exists: true,
				message: `Workspace ${workspaceName} already exists.`,
			};
		}
		// Create the workspace
		const workspace = await prisma.workspace.create({
			data: {
				name: workspaceName.toLowerCase().replace(/\s+/g, "-"),
			},
		});
	});
