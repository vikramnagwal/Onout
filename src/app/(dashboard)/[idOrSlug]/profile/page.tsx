"use client";
import { useWorkspace } from "@/app/lib/swr/use-Workspace";
import { Breadcrumb } from "@/packages/ui/breadcrumb";
import { ClientOnly } from "@/packages/ui/client-only";

export default function Page() {
    const workspace = useWorkspace();
    console.log("Workspace data:", workspace);
    return (
        <div>
            <ClientOnly>
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                    <h1 className="text-2xl font-bold">Profile Page</h1>
                    <Breadcrumb separator="?          " items={[{ title: "Home", href: "/" }, { title: "Profile", href: "/profile" }]} />
                    <h2 className="capitalize">{workspace?.user?.name || "stranger"}</h2>
                </div>
            </ClientOnly>
        </div>
    )
}