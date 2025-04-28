import { encryptMessages } from "@/packages/utils/functions/messages";
import { prisma } from "@/app/lib/db";
import { EncryptedMessageSchema } from "@/app/lib/zod/schema/messages-schema";
import { getIP, getMessageSource } from "@/packages/utils/functions/get-ip";
import { getSearchParams } from "@/packages/utils/functions/url";
import { NextRequest, NextResponse } from "next/server";
import { withSession } from "@/app/lib/session";

type Params = {
	id: string;
};

// GET: /api/[slug]/messages - get all messages in workspace
export const GET = withSession(async ({ params }) => {
	console.log("hi");
	// const ip = await getIP();
	console.log(params);

	return NextResponse.json({ message: "Hello" }, { status: 200 });
	try {
		const message = await prisma.messages.findMany({
			where: {
				workspace: {
					// slug: workspaceName,
				},
			},
			select: {
				content: true,
				clicks: true,
				createdAt: true,
				views: true,
				source: true,
				slug: true,
			},
		});
		return NextResponse.json(message, { status: 200 });
	} catch (error) {
		console.error("Error fetching message: ", error);
		return NextResponse.json(
			{ message: "Failed to fetch message" },
			{ status: 500 },
		);
	}
});

// POST: /api/[id]/messages - create a new message in workspace
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const ip = await getIP();
	const messageSource = await getMessageSource(request);
	console.log("browser: ", messageSource); // remove this line after testing
	const { id: slug } = await params;
	const { data } = await request.json();

	const { encryptedMessage } = await EncryptedMessageSchema.parseAsync(data);

	try {
		const message = await prisma.messages.create({
			data: {
				content: encryptedMessage,
				slug: slug,
				IpAddress: ip,
				source: messageSource,

				workspace: {
					connect: {
						slug: slug,
					},
				},
			},
		});
		return NextResponse.json(message, { status: 201 });
	} catch (error) {
		console.error("Error creating message: ", error);
		return NextResponse.json(
			{ message: "Failed to create message" },
			{ status: 500 },
		);
	}
}
