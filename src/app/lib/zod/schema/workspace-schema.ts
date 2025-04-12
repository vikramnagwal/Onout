import { z } from "zod";

export const CreateWorkspaceSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters long")
		.max(199, "Name must be at most 200 characters long")
		.regex(/^[a-zA-Z-_]+$/, "Name can only contain letters, numbers, dashes, and underscores")
		.transform((name) => name.toLowerCase()),
});
