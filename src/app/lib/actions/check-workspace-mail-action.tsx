"use server";

import { z } from "zod";
import { actionClient } from "./safe-action";

const emailSchema = z
    .string()
    .email("invalid email address")
    .min(1, "please enter your email")

export const checkWorkspaceViaEmail = actionClient
     .schema(emailSchema)
     .action(async ({parsedInput}) => {
        const { email } = parsedInput;

     })