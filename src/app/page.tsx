"use client";

import { SignOutButton } from "@/packages/ui/auth/sign-out";
import { Button } from "@/packages/ui/button";
import { Popover } from "@/packages/ui/popover";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
	const { data: session } = useSession();
	const [openPopover, setOpenPopover] = useState(false);
	return (
		<div>
			<div className="flex flex-col items-center justify-center h-screen z-30">
				<Popover 
					openPopover={openPopover}
					setOpenPopover={setOpenPopover}
					content="hello world">
					<Button 
						text="Open Popover"
						variant="fancy"
						/>
				</Popover>
				<h2 className="text-3xl font-bold">
					Welcome abroad {session?.user.email}
				</h2>
				<h1 className="font-semibold text-3xl">@#$%^&*!</h1>
				<SignOutButton />
				
			</div>
		</div>
	);
}
