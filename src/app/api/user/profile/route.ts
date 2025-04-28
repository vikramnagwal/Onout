import { prisma } from "@/app/lib/db";
import { getSessionOrThrow } from "@/packages/utils/functions/workspace";

// GET: /api/user/profile - get user profile
export async function GET(request: Request) {
	const session = await getSessionOrThrow();
	const userId = session?.user?.id;

	if (!userId) {
		return new Response(
			JSON.stringify({ message: "Session Expired! Please login again" }),
			{ status: 401 },
		);
	}

	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				image: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		if (!user) {
			return new Response(JSON.stringify({ message: "User not found" }), {
				status: 404,
			});
		}

		return new Response(JSON.stringify(user), { status: 200 });
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return new Response(
			JSON.stringify({ message: "Failed to fetch user profile" }),
			{ status: 500 },
		);
	}
}
