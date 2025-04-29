"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AnimatedContainer } from "@ui/animate-container";
import { Input } from "@ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@ui/button";
import { EmailSignUp } from "../register/signup-email";
import { SignUpOAuth } from "../register/signup-oauth";
import { signIn } from "next-auth/react";
import { Divider } from "../../divider";

export interface LoginFormProps {
	authMethod: "credentials" | "google";
	setAuthMethod: Dispatch<SetStateAction<"credentials" | "google">>;
}

export const LoginFormContext = createContext<LoginFormProps | undefined>(
	undefined,
);

export function LoginForm() {
	const [authMethod, setAuthMethod] = useState<"credentials" | "google">(
		"credentials",
	);
	const value = { authMethod, setAuthMethod };
	const [isPending, setIsPending] = useState<boolean>(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<EmailSignUp>();

	async function onSubmit(data: EmailSignUp) {
		signIn("credentials", {
			email: data.email,
			password: data.password,
			callbackUrl: "/",
		});
	}

	return (
		<LoginFormContext.Provider value={value}>
			<AnimatedContainer>
				<div className="flex flex-col gap-2 max-w-md mx-auto p-2">
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col space-y-4">
							<Input
								{...register("email")}
								type="email"
								placeholder="Email"
								autoComplete="email"
								error={errors.email?.message}
							/>
							<Input
								{...register("password")}
								type="password"
								placeholder="Password"
								error={errors.password?.message}
							/>

							<Button
								type="submit"
								text={isPending ? "logging in.." : "login"}
								loading={isPending}
								disabled={isPending}
							/>
						</div>
					</form>
					<Divider text="or"/>
					<SignUpOAuth />
				</div>
			</AnimatedContainer>
		</LoginFormContext.Provider>
	);
}
