"use server";

import { throwIfAuthenticated } from "./auth/throw-if-authenticated";
import { actionClient } from "./safe-action";
import { prisma } from "../db";
import { hashPassword } from "../auth/password";
import { z } from "zod";
import { generateOTP } from "../auth/generate-otp";

const EmailSignUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
	type: z.enum(["EMAIL_VERIFICATION", "PASSWORD_RESET"]),
});

export const createNewUser = actionClient
	.use(throwIfAuthenticated)
	.schema(EmailSignUpSchema)
	.action(async ({ parsedInput }) => {
		const { email, password, type } = parsedInput;
		const verificationCode = generateOTP(6);
		const expiresAt = new Date(Date.now() + 45 * 60 * 1000); // 45 minutes from now

		const newUser = await prisma.user.create({
			data: {
				email,
				hashedpassword: await hashPassword(password),
				emailVerified: false,
				VerificationToken: {
					create: {
						identifier: type,
						token: verificationCode,
						expires: expiresAt,
					}
				}
			},
		});

		if (!newUser) {
			throw new Error("Failed to create user");
		}

		return newUser;
	});
