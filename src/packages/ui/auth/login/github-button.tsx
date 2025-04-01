import { signIn } from "next-auth/react"
import { Github } from "@/packages/icons/github"

export function GithubButton({next}:{next?: string}) {
  const clicked = async () => {
    console.log("clicked")
    await signIn("github", {
      ...(next && next.length > 0 ? { callbackUrl: next } : {}),
    });
  }
    return (
      <button className="flex items-center bg-black text-white px-2 py-1 rounded-md text-sm" onClick={() => clicked()}><Github className="w-4 h-4 mx-2"/> Sign in with Github</button>
    );
}