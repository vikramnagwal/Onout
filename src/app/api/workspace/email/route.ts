import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";


const emailSchema = z
    .string()
    .email("Invalid email address")
    .min(1, "Email is required")
    .max(255, "Email must be at most 255 characters long");

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
	const query = searchParams.get("query") || "";
    const email = emailSchema.safeParse(query);

    if (!query || !email.success) {
        return new Response(JSON.stringify({ message: "Please provide a valid query" }), { status: 400 });
    }
    try {
        const workspace = await prisma.user.findUnique({
            where: {
                email: email.data,
            },
            select: {
                workspace: true
            }
        })
        if (!workspace) {
            return new Response(JSON.stringify({ message: "No workspace found for the provided email" }), { status: 404 });
        }
        return NextResponse.json({ workspace }, { status: 200 })
    } catch (error) {
        console.error("Error fetching workspace by email:", error);
        return new Response(JSON.stringify({ message: "Error fetching workspace" }), { status: 500 });
    }
}