import { emailSchema } from './../zod/schema/email-schema';
import { fetcher } from "@/packages/utils/functions/fetcher";
import useSWR from "swr";
import { z } from "zod";


interface emailSchema {
    email: string
}

export function useWorkspace(email: emailSchema) {
       console.log()
}

export function getWorkspaceByEmail(email: string) {
    const { data: workspace, error } = useSWR(
        email ? `/api/workspace/email?query=${email}` : null, fetcher)

    if (error) {
        return false;
    }

    return workspace || null;
} 