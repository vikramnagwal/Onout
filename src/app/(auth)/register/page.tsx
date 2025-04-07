"use client";

import { AuthLayout } from "@/packages/ui/layout/auth-layout";
import Register from "./page-client";

export default function RegisterPage() {
	return (
		<AuthLayout>
			<Register />
		</AuthLayout>
	);
}
