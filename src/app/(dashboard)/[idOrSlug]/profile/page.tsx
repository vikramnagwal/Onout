"use client";
import { useWorkspace } from "@/app/lib/swr/use-Workspace";
import { Avatar } from "@/packages/ui/avatar";

export default function Page() {
    const workspace = useWorkspace();
    console.log("Workspace data:", workspace);
    return (
        <div>
            <div>
                <Avatar />
                <p>Total messages</p>
            </div>
        </div>
    )
}