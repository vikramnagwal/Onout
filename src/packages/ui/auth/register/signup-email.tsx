"use client"

import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterContext } from "./context";
import { Input } from "../../input";
import { sendOTPEmail } from "@/packages/lib/auth/send-otp";
import { Button } from "../../button";
import { useState } from "react";

const emailSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type EmailSignUp = z.infer<typeof emailSignUpSchema>;

export function SignUpEmailForm() {
    const { setEmail, setPassword, setStep } = useRegisterContext();

    const { register, handleSubmit, getValues, formState: { errors } } = useForm<EmailSignUp>();
    const { executeAsync, isPending} = useAction(sendOTPEmail, {
        onSuccess: () => {
            toast.success("Verification Email Sent");
            setEmail(getValues().email);
            setPassword(getValues().password);
            setStep("verify");
        },
        onError: ({error}) => {
            
            toast.error(
              error.serverError ||
                // @ts-ignore (fix this)
                error.validationErrors?.email?.[0] ||
                // @ts-ignore (fix this)
                error.validationErrors?.password?.[0]
            );
        }
    });

    return (
      <form onSubmit={() => executeAsync(handleSubmit)}>
        <div className="flex flex-col space-y-4 max-w-md mx-auto">
          <Input
            {...register("email")}
            type="email"
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
    );
}