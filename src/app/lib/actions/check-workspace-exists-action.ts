import { actionClient } from "./safe-action";
import { z } from "zod";

const checkWorkspaceExistsSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Workspace name must be greater than 3 characters." })
		.max(199, { message: "Wow hold on, that's a long name!" }),
});

export const checkWorkspaceExists = actionClient
	.schema(checkWorkspaceExistsSchema)
	.action(async ({ parsedInput }) => {
		const { name: workspaceName } = parsedInput;
		try {
			const response = await fetch(
				`/api/workspace/exists?query=${workspaceName}`
			);
			
			if (!response.ok) {
				throw new Error("failed to check workspace name");
			}
			const data = await response.json();
			return data === 1; // Assuming if 1 is returned, the workspace exists
		} catch (error) {
			return new Error("Error checking workspace existence");
		}
	});
