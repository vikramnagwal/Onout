"use server";

import { prisma } from "../db";
import { actionClient } from "./safe-action";
import { z } from "zod";

// fix this : (this is a server action but used like a client action)
// fetch workspace name here from prisma and client use server

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
			const workspace = await prisma.workspace.findUnique({
				where: {
					slug: workspaceName,
				},
				select: {
					id: true,
				}
			})
			
			if (!workspace) {
				return false;
			} else {
				return true;
			}
		} catch (error) {
			return new Error("Error checking workspace existence");
		}
	});
