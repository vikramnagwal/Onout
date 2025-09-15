import { authOptions } from "@/app/lib/auth/options";
import { prisma } from "@/app/lib/db";
import { withSession } from "@/app/lib/auth/session";
import { trim } from "@/packages/utils/functions/trim";
import { Session } from "inspector/promises";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { cookies } from "next/headers";


const updateUserSchema = z.object({
    name: z.preprocess(trim, z.string().min(1).max(64)).optional(),
    avatar: z.preprocess(trim, z.string()).optional(),
    email: z.preprocess(trim, z.string().min(4)).optional()
})

type updateUser = z.infer<typeof updateUserSchema>

// Route:PATCH: - /api/user/ -update information about user
export async function PATCH(request: NextRequest, response: NextResponse) {
   const session = await getServerSession(authOptions)
   console.log(session)
    try {
    //     const body = await request.json()
    //   const { name, email, avatar }: updateUser =    updateUserSchema.parse(body)

    //   if(name) {
    //     await prisma.user.update({
    //        where: { id: session?.user.id }
    //     })
    //   }
    return session
    } catch (error) {
        console.error("Unable to update user info")
        return NextResponse.json({
            success: false,
            message: "Unable to update user info"
        }, { status: 500 })
    }
}

// api/user - delete user account
export const DELETE = withSession(async ({ session }) => {
    if (!session.user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // check if user is the real owner of the account
    if (session.user.id !== session.user.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await prisma.user.delete({
            where: { id: session.user.id }
        });
        return NextResponse.json({ message: "User account deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user account: ", error);
        return NextResponse.json({ message: "Failed to delete user account" }, { status: 500 });
    }
});