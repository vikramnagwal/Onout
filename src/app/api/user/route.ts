import { trim } from "@/packages/utils/functions/trim";
import { NextRequest } from "next/server";
import { z } from "zod";


const updateUserSchema = z.object({
    name: z.preprocess(trim, z.string().min(1).max(64)).optional(),
    avatar: z.preprocess(trim, z.string()).optional(),
    email: z.preprocess(trim, z.string().min(4)).optional()
})


// Route:PATCH: - /api/user/ -update information about user
export async function PATCH(request: NextRequest) {

}