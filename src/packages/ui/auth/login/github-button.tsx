import { signIn } from "next-auth/react";
import { Github } from "@/packages/icons/github";
import { Button } from "@ui/button";

export function GithubButton({ next }: { next?: string }) {
	return (
		<Button
			text="Sign in with Github"
			className="hover:bg-neutral-950"
			onClick={() =>
				signIn("github", {
					...(next && next.length > 0 ? { callbackUrl: next } : {}),
				})
			}
			icon={<Github className="w-4 h-4" />}
			type="button"
		/>
	);
}
