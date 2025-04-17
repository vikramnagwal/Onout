import { z } from "zod";

export const MessageSchema = z.object({
    message: z.string().min(1, "Message cannot be empty").max((99999), "Message cannot be more than 9999 characters"),
})

export const EncryptedMessageSchema = z.object({
    encryptedMessage: z.string().min(1, "Encrypted message cannot be empty").regex(/^[A-Za-z0-9+/]+={0,2}:[A-Za-z0-9+/]+={0,2}$/
),
})