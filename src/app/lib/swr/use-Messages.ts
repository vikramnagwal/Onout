'use client';

import { fetcher } from "@/packages/utils/functions/fetcher";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import useSWR from "swr";

export function useMessages() {
    const workspace = useParams().idOrSlug;
    const session = useSession();
    
    const endpoint = session.status === "authenticated" && workspace ? `/api/workspace/${workspace}/messages` : null;

    const { data, error, isLoading, mutate } = useSWR(endpoint, fetcher,  {
             revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true,
        
        // Auto-refresh every 1 minute (60000ms)
        refreshInterval: 60000,
        
        // Only refresh when tab is visible (saves API calls)
        refreshWhenHidden: false,
        refreshWhenOffline: false,
        
        // Error handling
        errorRetryCount: 2,
        errorRetryInterval: 5000,
        
        // Cache for 30 seconds to avoid duplicate requests
        dedupingInterval: 30000,
        });
    if (error) return { messages: null, isLoading: false, error };

    return {
        response: data || data || [],
        isLoading: isLoading || session.status === "loading",
        error,
        isError: !!error,
        isAuthenticated: session.status === "authenticated",
        refresh: mutate,
    }
}