import { z } from "zod";


export const InboxFormSchema = z.object({
    title: z.string().min(2, "Name must be at least 2 characters long").max(50, "Name must be at most 50 characters long"),
})

export type InboxFormSchema = z.infer<typeof InboxFormSchema>;
// fix: this two separate schemas make then one using omit
export const InboxNameSchema = z.object({
    title: z.string().min(2, "Inbox name must be at least 2 characters long").max(199, "Inbox name must be at most 200 character long")
})