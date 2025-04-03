'use client';

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation"
import { useState } from "react";
import { Button } from "@ui/button";
import { Google } from "@/packages/icons/google";


export function SignUpOAuth({methods}: {methods: "google"}) {
    const params = useSearchParams();
    const next = params.get("next") ?? "/dashboard";
    const [clickedGoogle, setClickedGoogle] = useState<boolean>(false);
    return (
        <div className="flex flex-col gap-2">
            {methods === "google" && (
                <Button
                text="Sign up with Google"
                variant="secondary"
                    type="button"
                    onClick={() => {
                        setClickedGoogle(true);
                        signIn("google", { callbackUrl: next });
                    }}
                   
                    disabled={clickedGoogle}
                    icon={<Google className="w-4 h-4" />}
                />
            )}
        </div>
    )
}