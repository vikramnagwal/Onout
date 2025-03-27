'use client';

import { useMediaQuery } from "@/packages/hooks/use-media";
import { AnimatedContainer } from "@/packages/ui/animate-container";
import { RegisterProvider, useRegisterContext } from "@/packages/ui/auth/register/context";
import { SignUpEmailForm } from "@/packages/ui/auth/register/signup-email";
import { VerifyEmailForm } from "@/packages/ui/auth/register/verify-email";
import { truncate } from "fs";
import Link from "next/link";

export default function RegisterPageClient() {
    return (
        <RegisterProvider>
            <RegisterPageFlow />
        </RegisterProvider>
    )
}

function SignUp() {
    return (
        <div className="flex flex-col items-center p-2 gap-3">
            <h1 className="text-2xl font-semibold">just one step away!</h1>
            <SignUpEmailForm />
        </div>
    )
}

export function Verify() {
    const { email } = useRegisterContext();
    const { isMobile } = useMediaQuery();
    return (
      <>
        <div className="w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl sm:border sm:shadow-sm">
          <div className="flex flex-col items-center justify-center gap-3 border-b border-neutral-200 bg-white px-4 pb-6 pt-8 text-center sm:px-16">
            <h3 className="text-xl font-semibold">Verify your email address</h3>
            <p className="text-sm text-neutral-500">
              Enter the six digit verification code sent to{" "}
              <strong className="font-medium text-neutral-600" title={email}>
                {email}
              </strong>
            </p>
          </div>
          <div className="bg-neutral-50 px-4 py-8 sm:px-16">
            <VerifyEmailForm />
          </div>
        </div>
       </>
    );
}

function RegisterPageFlow() {
    const { step } = useRegisterContext();

    switch (step) {
        case "signup":
            return <SignUp />;
        case "verify":
            return <Verify />;
        default:
            return <SignUp />;
    }
}