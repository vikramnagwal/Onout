import { signIn } from "next-auth/react";
import { Button } from "@ui/button";
import { Google } from "@/packages/ui/icons/google";

export function GoogleButton() {
	return (
		<Button
			text="Sign in with Google"
			variant={"secondary"}
			type="button"
			onClick={async () => {
				await signIn("google", { callbackUrl: "/onboarding/workspace" });
			}}
			icon={<Google className="w-4 h-4" />}
		/>
	);
}
