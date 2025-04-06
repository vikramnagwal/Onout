'use client'

import { SignOutButton } from "@/packages/ui/auth/sign-out";

export default function Home() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen z-30">
        <h1>home</h1>
        <SignOutButton />
      </div>
      <p>Welcome to the home page!</p>
    </div>
  );
}
