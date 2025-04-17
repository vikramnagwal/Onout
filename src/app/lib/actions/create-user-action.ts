"use server";

import { throwIfAuthenticated } from "./auth/throw-if-authenticated";
import { actionClient } from "./safe-action";
import { prisma } from "../db";
import { hashPassword } from "../auth/password";
import { z } from "zod";

const EmailSignUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const createNewUser = actionClient
	.use(throwIfAuthenticated)
	.schema(EmailSignUpSchema)
	.action(async ({ parsedInput }) => {
		const { email, password } = parsedInput;

		const newUser = await prisma.user.create({
			data: {
				email,
				hashedpassword: await hashPassword(password),
				emailVerified: false,
			},
		});

		if (!newUser) {
			throw new Error("Failed to create user");
		}

		return newUser;
	});
