import { Loader } from "lucide-react";

export function LoadingSpinner() {
	return (
		<div>
			<Loader className="animate-spin w-4 h-4 shadow-background" />
		</div>
	);
}
