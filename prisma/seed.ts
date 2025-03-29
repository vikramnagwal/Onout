import { prisma } from "@/app/lib/db"


;(async () => {
   try {
     const user = await prisma.user.create({
        data: {
            email: "testuser@test.com",
            username: "Test User",
            password: "password"
        }
    })
    const workspce = await prisma.workspace.create({
        data: {
            name: "Test Workspace",
            user: {
                connect: {
                    id: user.id
                }
            },
            uniquePageLink: "test-workspace"       
        }
    })
    const message = await prisma.messages.create({
        data: {
            content: "Test Message",
            workspace: {
                connect: {
                    id: workspce.id
                }
            },
            IpAddress: '132.414.54.12',
        }
    })
    console.table([user, workspce, message])
    prisma.$disconnect()
   } catch (error) {
    console.error(error)
   }
})()