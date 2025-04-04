'use client';
import { SignUpEmail } from "./signup-email";
import { SignUpOAuth } from "./signup-oauth";

export function SignUpForm() {
    return (
        <div className="flex flex-col gap-2 max-w-md mx-auto p-2">
            <SignUpEmail />
            <span className="mx-auto my-1">or</span>
            <SignUpOAuth />
        </div>
    );
}