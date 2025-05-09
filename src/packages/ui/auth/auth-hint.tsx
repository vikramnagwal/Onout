import { useSession } from "next-auth/react";

export function AuthHint() {
    const { data: session } = useSession();
    return (
            <p className="flex items-center mt-3 p-2 rounded-md bg-neutral-200">you are signed in as {session?.user.email}</p>
    )
}