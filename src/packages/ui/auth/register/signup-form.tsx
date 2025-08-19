"use client";
import { Divider } from "../../divider";
import { SignUpEmail } from "./signup-email";
import { SignUpOAuth } from "./signup-oauth";

export function SignUpForm() {
	return (
		<div className="flex flex-col gap-2 max-w-md mx-auto p-2">
			<SignUpEmail />
			<Divider text="or"/>
			<SignUpOAuth />
		</div>
	);
}
