import { authOptions } from "@/app/lib/auth/options";
import { prisma } from "@/app/lib/db";
import { trim } from "@/packages/utils/functions/trim";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


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