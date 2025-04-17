"use client";

import { useWorkspace } from "@/app/lib/swr/useWorkspace";
import { Button } from "@/packages/ui/button";
import { Popover } from "@/packages/ui/popover";
import { useState } from "react";

export default function InboxName() {
	const workspace = useWorkspace();
	const [openInbox, setOpenInbox] = useState<boolean>(false);

	return (
		<div className="flex flex-col justify-center items-center h-full p-4">
			<h1>check inbox name</h1>
			<Popover
				content={"hello thre"}
				openPopover={openInbox}
				setOpenPopover={setOpenInbox}
			>
				<Button text={"Create Inbox"} shortcut="c" />
			</Popover>
		</div>
	);
}
