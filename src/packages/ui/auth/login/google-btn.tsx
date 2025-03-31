import { signIn } from "next-auth/react"
import { Button } from "../../button"
import { Google } from "@/packages/icons/google"

export function GoogleButton({next}:{next?: string}) {
    return (
        <Button 
            text="Sign in with Google"
            icon={<Google className="w-4 h-4" />}
            onClick={() => signIn("google", { callbackUrl: next })}
            className="w-full justify-center items-center bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
            />
    )
}