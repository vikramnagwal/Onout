"use server";

import { actionClient } from "./safe-action";
import { verificationToken } from "../zod/schema/token-schema";
import { prisma } from "../db";

export const verifyOTP = actionClient
    .schema(verificationToken)
    .action(async ({ parsedInput }) => {
        const { token, code } = parsedInput;

        // const updatedPassword = await prisma.user.findUnique()
    })