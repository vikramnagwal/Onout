import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AnimatedContainer } from "@ui/animate-container";
import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { GoogleButton } from "./google-btn";

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
    return (
        <div>
            <AnimatedContainer className="flex flex-col items-center gap-3 my-2 bg-neutral-100 p-2 rounded-md">
                <h1 className="text-2xl mb-4 font-semibold">Login</h1>
                <form className="flex flex-col space-y-4 w-md mx-auto">
                    <Input 
                        type="email"
                        title="Email"
                        placeholder="johndoe@anom.me"
                    />
                    <Input 
                        type="password"
                        title="Password"
                        placeholder="Password"
                    />
                    <Button 
                    type="submit"
                    text="Login"
                    loading={false}
                    />
                </form>
                <div>or</div>
                <div>
                    <GoogleButton next="yes"/>
                </div>
            </AnimatedContainer>
        </div>
    )
}