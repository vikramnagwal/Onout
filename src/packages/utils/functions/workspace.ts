import { v4 as uuidv4 } from "uuid";

export async function generateUniquePageId(email: string): Promise<string> {
	const emailprefix = email.split("@")[0];
	const randomString = uuidv4().split("-")[0]; // Generate a random string
	const timestamp = Date.now().toString(36); // Get the current timestamp in base 36
	const uniqueId = `${emailprefix}-${randomString}-${timestamp}`; // Combine the email prefix, random string, and timestamp
	return uniqueId;
}

export const getAuthTokenOrThrow = async (req: Request): Promise<string> => {
	try {
		const authorizationHeader = req.headers.get("Authorization");
		if (!authorizationHeader?.includes("Bearer")) {
			throw new Error("Berer token not found");
		}
		const token = authorizationHeader.split(" ")[1];
		return token;
	} catch (error) {
		throw new Error("Token not found or invalid tokens");
	}
};
