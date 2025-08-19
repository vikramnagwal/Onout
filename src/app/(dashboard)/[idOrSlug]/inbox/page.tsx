"use client";
import { useWorkspace } from "@/app/lib/swr/use-Workspace"
import { Messages } from "@/packages/ui/message/messages";

export default function () {
	const workspace = useWorkspace();
	console.log("workspace", workspace);
	return (
			<div className="flex flex-col items-center justify-center w-full h-full p-4">
				<Messages />
			</div>
	)
}
