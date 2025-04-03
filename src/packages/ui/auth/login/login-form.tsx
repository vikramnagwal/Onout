'use client';

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { AnimatedContainer } from "@ui/animate-container";
import { Input } from "@ui/input";
import { useForm } from "react-hook-form"
import { Button } from "@ui/button";
import { EmailSignUp } from "../register/signup-email";


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
    const [isPending, setIsPending] = useState<boolean>(false)

    const { handleSubmit, register, formState: { errors } } = useForm<EmailSignUp>();

    function onSubmit(data: EmailSignUp) {
        setIsPending(true)
        console.log(data)
        setIsPending(false)
    } 

    return (
      <LoginFormContext.Provider value={value}>
        <div className="w-full p-2">
          <AnimatedContainer className="flex flex-col items-center gap-3 my-2 bg-neutral-100 p-2 rounded-md">
            <div className="flex flex-col gap-2 w-full">
              <h1 className="text-2xl font-bold text-center">Welcome back</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
               <div className="flex flex-col space-y-4 w-full">
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
               
                         <Button type="submit" text={isPending ? "Submitting.." : "Sign Up"} loading={isPending} disabled={isPending} />
                       </div>
              </form>
            </div>
          </AnimatedContainer>
        </div>
      </LoginFormContext.Provider>
    );
}