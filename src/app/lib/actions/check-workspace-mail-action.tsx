"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";
import { prisma } from "../db";

const emailSchema = z.object({
   email:  z.string()
    .email("invalid email address")
    .min(1, "please enter your email")
})

export const checkWorkspaceViaEmail = actionClient
     .schema(emailSchema)
     .action(async ({parsedInput}) => {
        const { email } = parsedInput;
        const workspace = await prisma.user.findUnique({
            where: {
                email: email
            }, 
            select: {
                workspace: true
            }
        })

        if (!workspace) {
            return {
                  message: "workspace does't exists",
                  data: null
            }
        }
        return workspace
     })