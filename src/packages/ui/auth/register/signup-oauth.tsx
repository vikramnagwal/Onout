'use client';

import { signIn } from "next-auth/react";
// import { useSearchParams } from "next/navigation"
import { useState } from "react";
import { Button } from "@ui/button";
import { Google } from "@/packages/icons/google";


export function SignUpOAuth() {
    // const params = useSearchParams();
    const next = "http://localhost:3000/onboarding/workspace";
    const [clickedGoogle, setClickedGoogle] = useState<boolean>(false);
    return (
      <div className="flex flex-col gap-2">
         <Button
                text="Sign up with Google"
                variant="secondary"
                    type="button"
                    onClick={async () => {
                        setClickedGoogle(true);
                        await signIn("google", { callbackUrl: next });
                    }}
                   
                    disabled={clickedGoogle}
                    icon={<Google className="w-4 h-4" />}
                /> 
      </div>
    );
}