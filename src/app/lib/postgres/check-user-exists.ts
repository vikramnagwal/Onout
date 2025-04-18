import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prisma } from "../db";

export async function checkUserExists(id: string) {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				emailVerified: true,
			},
		});

		return !!user; // Return true if user exists and is verified, false otherwise
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			if (error.code === "P1001") {
				throw new Error("Database connection error");
			}
			throw new Error("prisma database error while checking user existence");
		}
		throw new Error("Error checking user existence");
	}
}
