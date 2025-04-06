import { prisma } from "@/app/lib/db";
import { getSession } from "@/app/lib/session";
import { WorkspaceFormSchema } from "@/packages/ui/workspace/create-workspace-form";
import { NextRequest, NextResponse } from "next/server";

// GET: /api/workspace fetch all the associated workspaces with user
export async function GET(request: NextRequest) {
   const session = await getSession()
   const userId = session?.user?.email ?? undefined;
   if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }

   const workspaces = await prisma.workspace.findMany({
      where: {
         user: {
            email: userId,
         }
      },
      select: {
         id: true,
         name: true,
         uniquePageLink: true,
      }
   });

   return NextResponse.json(workspaces, { status: 200 });
}

// POST: /api/workspace creates a new workspace
export async function POST(request: NextRequest) {
   const body = WorkspaceFormSchema.parse(request.json());
   const session = await getSession()
   
   const userId = session?.user?.email ?? undefined;
   const workspaceId = body.name;

   const existingWorkspace = await prisma.workspace.findUnique({
         where: { name: workspaceId },
         select: {
            id: true,
         }
   });
   if (existingWorkspace) {
      return NextResponse.json({ message: "Workspace already exists" }, { status: 400 });
   }

   const workspace = await prisma.workspace.create({
      data: {
         name: workspaceId,
         user: {
            connect: { email: userId },
         },
         uniquePageLink: crypto.randomUUID(),
      }
   })

   if (!workspace) {
      return NextResponse.json({ message: "Failed to create workspace" }, { status: 500 });
   }
   
   return NextResponse.json({ message: "workspace created", workspace }, { status: 200 });
}