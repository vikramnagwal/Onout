"use client";

import { LoginForm } from "@/packages/ui/auth/login/login-form";
import { AuthLayout } from "@/packages/ui/layout/auth-layout";
import Link from "next/link";

export default function LoginPage() {
	return (
		<AuthLayout>
			<div className="w-full max-w-md overflow-hidden border-y border-neutral-200 sm:rounded-2xl sm:border sm:shadow-sm">
				<div className="bg-white pb-6 pt-8 text-start px-4 sm:px-16">
					<h1 className="text-2xl font-bold">Login</h1>
					<h3 className="text-md md:text-xl font-medium text-neutral-600">
						Sign in to your Onout account
					</h3>
				</div>
				<div className="bg-neutral-50 px-4 py-8 sm:px-16">
					<LoginForm />
				</div>
			</div>
			<p className="mt-4 text-center text-sm text-neutral-500">
				Don't have an account?&nbsp;
				<Link
					href="register"
					className="font-semibold text-neutral-500 underline underline-offset-2 transition-colors hover:text-black"
				>
					Sign up
				</Link>
			</p>
		</AuthLayout>
	);
}
