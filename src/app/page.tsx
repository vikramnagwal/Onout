"use client";

import { SignOutButton } from "@/packages/ui/auth/sign-out";
import { useWorkspace } from "./lib/swr/use-Workspace";

export default function Home() {
	const data = useWorkspace();
	console.log("Workspace data: ", data);
	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen z-30">
				<h2 className="text-3xl font-bold">
					{/* Welcome abroad {session?.user?.email}! */}
				</h2>
				<h1 className="font-semibold text-3xl">OnOut</h1>
				<SignOutButton />
			</div>
		</div>
	);
}
