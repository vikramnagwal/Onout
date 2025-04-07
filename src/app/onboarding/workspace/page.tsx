"use client";

import { CreateWorkspaceForm } from "@/packages/ui/workspace/create-workspace-form";

export default function WorkspacePage() {
	return (
		<div className="flex flex-col items-center justify-center h-full p-4">
			<h1 className="text-2xl font-bold mb-4">Create a New Workspace</h1>
			<p className="mb-4">Please enter a name for your new workspace.</p>
			<div className="w-full max-w-md p-4 bg-white rounded shadow-md">
				<CreateWorkspaceForm />
			</div>
		</div>
	);
}
