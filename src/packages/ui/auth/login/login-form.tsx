'use client';

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AnimatedContainer } from "@ui/animate-container";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { GoogleButton } from "./google-button";
import { signIn } from "next-auth/react";
import { GithubButton } from "./github-button";

export interface LoginFormProps {
    authMethod: "credentials" | "google",
    setAuthMethod: Dispatch<SetStateAction<"credentials" | "google">>
}

export const LoginFormContext = createContext<LoginFormProps | undefined>(
    undefined
)

export function LoginForm() {
    const [authMethod, setAuthMethod] = useState<"credentials" | "google">("credentials")
    const value = { authMethod, setAuthMethod }

    function handleSubmit(data: any) {
        data.preventDefault()
        // Handle form submission here
        console.log("Form submitted:", data);
         signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
            callbackUrl: "/",
         })
    }
    return (
        <div>
            <AnimatedContainer className="flex flex-col items-center gap-3 my-2 bg-neutral-100 p-2 rounded-md">
                <div className="flex flex-col gap-2 w-full">
                    <h1 className="text-2xl font-bold text-center">Welcome back</h1>
                    <GoogleButton next="/"/>
                    <GithubButton next="/"/>
                </div>
            </AnimatedContainer>
        </div>
    )
}