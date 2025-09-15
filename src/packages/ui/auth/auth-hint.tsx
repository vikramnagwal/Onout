import { useSession } from "next-auth/react";
import { Info } from "@packages/ui/icons/info";

export function AuthHint() {
    const { data: session } = useSession();
    return (
      <pre className="flex items-center space-x-3 mt-3 p-2 text-lg rounded-md bg-neutral-200">
        <Info color={session ? "blue" : "red"} />
        {session ? (
          <div>
            you are signed in as{" "}
            <span className="text-black font-semibold">
              {session?.user.email}
            </span>
            .
          </div>
        ) : (
            <p>
              you are not signed in. please sign in to access this page.
            </p>
        )}
      </pre>
    );
}