import { signOut } from "next-auth/react";
import { Button } from "../button";

export function SignOutButton() {
    return (
        <Button
         text="Sign Out"
         variant={"danger"}
         onClick={async () => await signOut({ callbackUrl: "/login" })}
        />
    )
}