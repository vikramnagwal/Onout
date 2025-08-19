"use client";

import { ShimmerDots } from "@/packages/ui/shimmer-dots";
import { CreateWorkspaceForm } from "@/packages/ui/workspace/create-workspace-form";

// create a context here so if user left the page and came back, the form is still there
export default function WorkspacePage() {
	return (
    <div className="flex justify-between h-screen p-4">
      <ShimmerDots className="hidden md:block" cellSize={12} />
      <div className="z-20 flex flex-col justify-center w-full max-w-2xl mx-auto bg-white rounded-lg px-4 md:px-8 shadow-lg">
        <h1 className="text-xl md:text-4xl font-bold mb-2">
          Create a New Workspace
        </h1>
        <p className="mb-6 text-lg text-neutral-500">
          Please enter a name for your new workspace.
        </p>
        <div className="w-full max-w-md py-4 bg-white">
          <CreateWorkspaceForm />
        </div>
      </div>
      <div className="relative w-1/2 hidden md:block"></div>
    </div>
  );
}
