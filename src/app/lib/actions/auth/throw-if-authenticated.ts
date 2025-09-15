import { getSession } from "../../auth/session";

interface AuthParams {
	next: (options: { ctx: any }) => any;
	ctx: any;
}

export const throwIfAuthenticated = async ({ next, ctx }: AuthParams) => {
	const session = await getSession();

	if (session) {
		throw new Error("User already logged in");
	}
	return next({ ctx });
};
