import { fetcher } from "@/packages/utils/functions/fetcher";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { Workspace } from "../types";

export function useWorkspace() {
	const { data: session } = useSession();
	const { data: workspace, error } = useSWR<Workspace[]>(

		session?.user && "/api/workspace",
		fetcher,
		{
			dedupingInterval: 60000, // 1 minute
		},
	);
	if (error || !workspace) return null;
	if (workspace.length === 0) return null;
	return workspace[0];
}
