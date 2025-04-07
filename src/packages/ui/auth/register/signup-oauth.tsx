"use client";

import { GoogleButton } from "../login/google-button";

export function SignUpOAuth() {
	const next = "/onboarding/workspace";

	return (
		<div className="flex flex-col gap-2">
			<GoogleButton next={next} />
		</div>
	);
}
