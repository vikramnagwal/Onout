import { signOut } from "next-auth/react";
import { Button } from "../button";
import { ReactNode } from "react";

interface SignOutButtonProps {
	text?: string;
	disabled?: boolean;
	icon?: ReactNode;
	loading?: boolean;
	className?: string;
}

export function SignOutButton({text = "Sign Out", icon, disabled, loading, className}: SignOutButtonProps) {
	return (
		<Button
			text={text}
			icon={icon}
			disabled={disabled}
			loading={loading}
			className={className}
			variant={"danger"}
			onClick={async () => await signOut({ callbackUrl: "/login" })}
		/>
	);
}
