"use server";

import { InboxFormSchema } from "@/app/lib/zod/schema/link-schema";
import { actionClient } from "../safe-action";
import { prisma } from "@/app/lib/db";

export const checkInboxName = actionClient
    .schema(InboxFormSchema)
    .action(async ({ parsedInput }) => {
        const { title } = parsedInput;
        try {
            const inbox = await prisma.inbox.findUnique({
                where: {
                    title
                },
                select: {
                    id: true
                }
            })

            return !!inbox
        } catch (error) {
            console.error("Error checking inbox name");
            return false;
        }
        
    })