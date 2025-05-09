"use client";

import { AuthHint } from "@/packages/ui/auth/auth-hint";
import { LayoutSpinner } from "@/packages/ui/loaders/layout-spinner";

export default function NotFound() {
    return (
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen text-neutral-400 p-2">
        <div className="relative flex flex-col">
          <h1 className="text-4xl font-semibold z-10">
            The page you are looking for does not exists.
          </h1>
          <AuthHint />
        </div>
        <LayoutSpinner />
      </div>
    );
}