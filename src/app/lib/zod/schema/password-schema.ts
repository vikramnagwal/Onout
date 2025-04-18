import { z } from "zod";

export const PasswordChangeSchema = z.object({
    oldPassword: z.string().min(8, { message: "Old password must be at least 8 characters long" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Old password must contain at least one uppercase letter, one lowercase letter, and one number" }),
    newPassword: z.string().min(8, { message: "New password must be at least 8 characters long" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "New password must contain at least one uppercase letter, one lowercase letter, and one number" }),
})

export const SetPasswordSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters long" }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
})