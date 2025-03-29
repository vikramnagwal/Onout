import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
}

export async function decryptPassword({password, hashedPassword}:{password: string, hashedPassword: string}): Promise<boolean> {
    return compare(password, hashedPassword);
}