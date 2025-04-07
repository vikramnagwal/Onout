import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
	return await hash(password, 12);
}

export async function decryptPassword({
	password,
	passwordHash,
}: { password: string; passwordHash: string }): Promise<boolean> {
	return await compare(password, passwordHash);
}
