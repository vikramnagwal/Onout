import { cn } from "../utils/functions/cn";

export function Wordmark({ className }: { className?: string }) {
	return (
		<div>
			<h1 className={cn("text-xl font-semibold", className)}>OnOut</h1>
		</div>
	);
}
