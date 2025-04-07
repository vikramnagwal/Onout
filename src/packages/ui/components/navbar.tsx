"use client";

import { signIn, useSession } from "next-auth/react";
import { Wordmark } from "../wordmark";
import { SignOutButton } from "../auth/sign-out";
import { Button } from "../button";

export function Navbar() {
	const { data: session } = useSession();
	return (
		<>
			<div>
				<Wordmark className="flex items-center justify-center h-16 bg-white shadow-md" />
				<div>
					{session ? (
						<div className="flex items-center justify-between px-4 py-2 bg-gray-100">
							<h1 className="text-lg font-bold">
								Welcome, {session.user?.name}
							</h1>
							<SignOutButton />
						</div>
					) : (
						<div>
							<Button
								text="Get started"
								className="m-4"
								variant="outline"
								size="lg"
								onClick={() => signIn()}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
