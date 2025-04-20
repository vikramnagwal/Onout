import { fetcher } from "@/packages/utils/functions/fetcher";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import useSWR from "swr";


export function useWorkspace() {
    const { data: session } = useSession();
    const { idOrSlug: workspaceId } = useParams<{idOrSlug: string}>()
    console.log("useWorkspace", workspaceId, session) // remove this line

    const { data:workspace, error, mutate } = useSWR( session ? `/api/workspace/${workspaceId}` : null, fetcher)
    if (!workspace || error || !session) {
        console.log("No workspace found for the user.");
        return null
    }
    return {
        ...workspace,
        user: {
            ...session.user,
            emailVerified: session.user.emailVerified,
        },
    }
}
