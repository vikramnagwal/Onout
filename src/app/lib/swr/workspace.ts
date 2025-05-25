import { fetcher } from "@/packages/utils/functions/fetcher";
import useSWR from "swr";

export function getWorkspaceByEmail(email: string) {
    const { data: workspace, error } = useSWR(
        email ? `/api/workspace/email?query=${email}` : null, fetcher)

    if (error) {
        return false;
    }

    return workspace || null;
} 