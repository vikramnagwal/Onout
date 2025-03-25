'use client';

import { RegisterProvider, useRegisterContext } from "@/packages/ui/auth/register/context";
import { SignUpEmailForm } from "@/packages/ui/auth/register/signup-email";
import { VerifyEmailForm } from "@/packages/ui/auth/register/verify-email";

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
            <h1 className="text-2xl font-semibold">Welcome to anom</h1>
            <SignUpEmailForm />
        </div>
    )
}

function Verify() {
    const { email } = useRegisterContext();
    return (
      <div className="flex flex-col items-center p-2">
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-semibold">
            Verify your code
          </h1>
          <h3>We've sent a secret code to {email || "noreply@test.com"}. </h3>
        </div>
        <VerifyEmailForm />
      </div>
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