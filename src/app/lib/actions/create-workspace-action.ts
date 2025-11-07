 "use server";

import { actionClient } from "./safe-action";
import { CreateWorkspaceSchema } from "../zod/schema/workspace-schema";

export const createWorkspace = actionClient
	.schema(CreateWorkspaceSchema)
	.action(async ({ parsedInput }) => {
		const { name: workspaceName } = parsedInput;
		const workspaceId = workspaceName.replace(/\s+/g, "-").toLowerCase();

		// Create the workspace
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_APP_URL}/api/workspace`,
			{
				method: "POST",
				body: JSON.stringify({ workspaceId }),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);

		if (!response.ok) {
			console.error("Error creating workspace:", response.statusText);
			return null;
		}
		const workspace = await response.json();
		console.log("Workspace created:", workspace);

		if (!workspace) {
			return {
				message: "Error creating workspace",
			};
		}
	});
