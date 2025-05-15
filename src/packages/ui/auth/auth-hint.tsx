import { useSession } from "next-auth/react";
import { Info } from "../icons/info";

export function AuthHint() {
    const { data: session } = useSession();
    return (
      <pre className="flex items-center space-x-2 mt-3 p-2 text-lg rounded-md bg-neutral-200">
        <Info color="blue"/>
        you are signed in as <span className="text-black font-semibold">{session?.user.email}</span>.
      </pre>
    );
}