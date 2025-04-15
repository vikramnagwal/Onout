"use client";

import { checkInboxName } from "@/app/lib/actions/links/check-inbox-exists-action";
import { Input } from "../input";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import {
	InboxFormSchema,
	InboxNameSchema,
} from "@/app/lib/zod/schema/link-schema";
import { Button } from "../button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { cn } from "@/packages/utils/functions/cn";

export default function CreateInboxForm() {
	const [isAvailable, setIsAvailble] = useState<boolean | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setError,
		clearErrors,
	} = useForm<InboxFormSchema>();

	const slug = watch("title");
	const debouncedInboxName = useDebounce(slug, 800);

	const { executeAsync, status } = useAction(checkInboxName, {
		onSuccess({ data }) {
			clearErrors("title");
			if (!data) {
				setIsAvailble(true);
			} else if (data) {
				setError("title", {
					type: "mannual",
					message: "Inbox name alredy exists",
				});
				setIsAvailble(false);
			} else {
				setIsAvailble(null);
				clearErrors("title");
				toast.error("Something went wrong");
			}
		},
		onError(error) {
			setIsAvailble(null);
			setError("title", {
				type: "mannual",
				message: "Something went wrong",
			});
			console.error("Error checking inbox name", error);
		},
	});

	async function fetchInboxNameExistence() {
		const isValidInboxName = (
			await InboxNameSchema.safeParseAsync(debouncedInboxName)
		);
		console.log("isValidInboxName", isValidInboxName);
		if (isValidInboxName) {
			setIsAvailble(null);
			clearErrors("title");
			await executeAsync({ title: debouncedInboxName });
		}
		return;
	}

	useEffect(() => {
		fetchInboxNameExistence();
	}, [executeAsync, debouncedInboxName]);

	const isChecking = status === "executing";
	return (
		<div className="flex p-3 m-3">
			<form>
				<Input
					{...register("title")}
					placeholder="check inbox name"
					type="text"
					error={errors.title?.message}
					className={cn(
						"mb-2",
						isAvailable && "border-green-500 focus-visible:ring-green-300",
						errors.title && "border-red-500 focus-visible:ring-red-300",
					)}
					autoComplete="off"
					required
				/>
				{errors.title && (
					<span className="text-red-500 text-sm">
						{errors.title.message}
					</span>
				)}

				<Button
					text={"create"}
					type="submit"
					disabled={isChecking || !!errors.title}
				/>
			</form>
		</div>
	);
}
