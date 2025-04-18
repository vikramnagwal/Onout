import { decryptPassword, hashPassword } from "@/app/lib/auth/password";
import { prisma } from "@/app/lib/db";
import { PasswordChangeSchema, SetPasswordSchema } from "@/app/lib/zod/schema/password-schema";
import { getSessionOrThrow } from "@/packages/utils/functions/workspace";
import { NextRequest, NextResponse } from "next/server";

// PATCH: /api/user/password - change user password
export async function PATCH(request: Request) {
    const session = await getSessionOrThrow();
    const userId = session?.user?.id;
    if (!userId) {
        return new Response(JSON.stringify({ message: "Session Expired! Please login again" }), { status: 401 });
    }

    const { oldPassword, newPassword } = await PasswordChangeSchema.parseAsync(await request.json());

    try {
        const password = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                hashedpassword: true,
            }
        })
        if (!password?.hashedpassword) {
            return NextResponse.json({ message: "No password found. Please set your password"}, { status: 404 });
        }
        const isValidPassword = await decryptPassword({password: oldPassword, passwordHash: password.hashedpassword});
        // remove if not true password
        if (!isValidPassword) {
            return NextResponse.json({ message: "password is incorrect" }, { status: 400 });
        }

        const hashedPassword = await hashPassword(newPassword);
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedpassword: hashedPassword,
            },
        });
        if (!updatedUser) {
            return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
        }
        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating password: ", error);
        return NextResponse.json({ message: "Failed to update password" }, { status: 500 });
    }
}

// POST: /api/user/password - set user password
export async function POST(request: NextRequest) {
    const session = await getSessionOrThrow();
    const userId = session?.user?.id;
    if (!userId) {
        return new Response(JSON.stringify({ message: "Session Expired! Please login again" }), { status: 401 });
    }

    const { password } = await SetPasswordSchema.parseAsync(await request.json());
    // check if password already existse

    try {
        const existingPassword = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                hashedpassword: true,
            }
        })
        if (existingPassword?.hashedpassword) {
            return NextResponse.json({ message: "Password already set. Please update your password" }, { status: 400 });
        }
        // hash password and save to db
        const hashedPassword = await hashPassword(password);
        const updatedUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedpassword: hashedPassword,
            },
        });
        if (!updatedUser) {
            return NextResponse.json({ message: "Failed to set password" }, { status: 500 });
        }
        return NextResponse.json({ message: "Password set successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error setting password: ", error);
        return NextResponse.json({ message: "Failed to set password" }, { status: 500 });
    }
}