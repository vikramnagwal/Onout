"use client";

import { AuthHint } from "@/packages/ui/auth/auth-hint";
import { Button } from "@/packages/ui/button";
import { BackIcon } from "@/packages/ui/icons/back";
import { LayoutSpinner } from "@/packages/ui/loaders/layout-spinner";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const navigator = useRouter();
  function goBack() {
    if (navigator.back() === undefined) {
      navigator.push("/");
      return;
    }
    navigator.back();
  }
    return (
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen text-neutral-900 p-4">
        <div className="relative flex flex-col px-4">
          <h1 className="text-4xl font-semibold z-10">
            The page you are looking for does not exists.
          </h1>
          <AuthHint />
          <Button onClick={goBack} text="Go Back" icon={<BackIcon />} className="mt-2" />
        </div>
        <LayoutSpinner />
      </div>
    );
}