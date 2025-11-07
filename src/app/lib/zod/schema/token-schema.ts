import z from "zod";

export const verificationToken = z.object({
    id: z.string().uuid(),
    userID: z.string(),
    token: z.string().length(6),
    code: z.string().max(6).min(6).regex(/^\d+$/, { message: "Code must be numeric" }),
});

