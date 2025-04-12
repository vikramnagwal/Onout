"use client";

import { SignOutButton } from "@/packages/ui/auth/sign-out";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen z-30">
				<h1>home</h1>
				<h2 className="text-3xl font-bold">
					Welcome abroad {session?.user.email}
				</h2>
				<SignOutButton />
			</div>
			<p>Welcome to the home page!</p>
		</div>
	);
}
