import { z } from "zod";

export const authorizeSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long").max(999, "Password must be at most 1000 characters long"),
})