"use client";

import { fetcher } from "@/packages/utils/functions/fetcher";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function useWorkspace() {
    const { data: session } = useSession();
    const { idOrSlug: workspaceId } = useParams();

    const { data: workspace, error, mutate } = useSWR( session ? `/api/workspace/${workspaceId}` : null, fetcher)
    if (!workspace || error || !session) {
        console.error("No workspace found for the user.");
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


export function getWorkspaceByEmail(email: string) {
    const { data: workspace, error } = useSWR(
        email ? `/api/workspace/email/${email}` : null,
        fetcher
    );

    if (error) {
        console.error("Error fetching workspace by email:", error);
        return null;
    }

    if (!workspace) {
        console.warn("No workspace found for the provided email.");
        return null;
    }

    return workspace;
}