'use client';

import { signIn } from "next-auth/react"
import { Button } from "@ui/button"
import { Google } from "@/packages/icons/google"

export function GoogleButton({next}:{next?: string}) {
    const handleClick = () => {
        console.log("trigger")
    }
    return (
      <button
        
        onClick={() => {
          signIn("google", { callbackUrl: next });
          handleClick();
        }}
        className="w-full text-sm rounded-md px-2 py-1 cursor-pointer flex justify-between items-center bg-white text-gray-800  dark:bg-black dark:text-white dark:hover:bg-gray-700"
      >
        <Google className="w-4 h-4" /> Sign in with Google
      </button>
    );
}