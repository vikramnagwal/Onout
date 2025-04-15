"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useAction } from "next-safe-action/hooks";
import { checkWorkspaceExists } from "@/app/lib/actions/check-workspace-exists-action";
import { cn } from "@/packages/utils/functions/cn";
import { toast } from "sonner";
import { CreateWorkspaceSchema } from "@/app/lib/zod/schema/workspace-schema";
import { useRouter } from "next/navigation";
import { AlertIcon } from "../icons/alert";


type CreateWorkspaceFormProps = z.infer<typeof CreateWorkspaceSchema>;

const DEBOUNCE_DELAY = 800;
const MIN_WORKSPACE_NAME_LENGTH = 2;

export function CreateWorkspaceForm() {
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
		clearErrors
	} = useForm<CreateWorkspaceFormProps>({
		defaultValues: {
			name: "",
		},
	});


	const slug = watch("name");
	const debouncedWorkspaceName = useDebounce(slug, DEBOUNCE_DELAY);

	const { executeAsync: executeNameCheck, status: checkStatus } = useAction(checkWorkspaceExists, {
		onSuccess: (result) => {
			const isTaken = result.data;
			if (isTaken) {
				setIsAvailable(false);
				setError("name", {
					type: "manual",
					message: "Workspace name already taken",
				});
			}
			else {
				setIsAvailable(true);
			}
		},
		onError: (_) => {
			toast.error("Error checking workspace existence");
			setError("name", {
				type: "manual",
				message: "failed to check workspace name",
			});
			setIsAvailable(null)
		},
	});

	async function fetchWorkspaceExistance() {
		clearErrors("name");
		const isValidWorkspaceName = await CreateWorkspaceSchema.safeParseAsync({
			name: debouncedWorkspaceName
		});	
		if (isValidWorkspaceName.success && debouncedWorkspaceName.length > MIN_WORKSPACE_NAME_LENGTH) {
			setIsAvailable(null);
			clearErrors("name");
			await executeNameCheck({ name: debouncedWorkspaceName });
		}
		return;
	}

	async function onSubmit(data: CreateWorkspaceFormProps) {
		setIsCreating(true);
		if (isAvailable) {
			const { name } = data;
			const response = await fetch("/api/workspace", {
				method: "POST",
				body: JSON.stringify({ name }),
				headers: {
					"Content-Type": "application/json",
				},
			})
			if (response.ok) {
				const { workspace } = await response.json();
				toast.success("Workspace created successfully");
				router.push(`/${workspace?.name}/inbox`);
			} else {
				toast.error("Error creating workspace");
				setIsCreating(false);
			}
		}
	}

	useEffect(() => {
		fetchWorkspaceExistance();
	}, [debouncedWorkspaceName, executeNameCheck]);

	const isChecking = checkStatus === "executing";

	return (
    <>
	  <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col my-2">
          <Input
            {...register("name", { required: true })}
            placeholder="Workspace Name"
            type="text"
            error={errors.name?.message}
            className={cn(
              "mb-2",
              isAvailable && "border-green-500 focus-visible:ring-green-300",
              errors.name && "border-red-500 focus-visible:ring-red-300"
            )}
            autoComplete="off"
            required
          />
		  <span className="text-sm text-red-500/80 min-h-[28px] flex items-end justify-center mb-2">{errors.name?.message && <><AlertIcon /> {errors.name.message}</>}</span>
        </div>

          <Button
            text={isCreating ? "Creating..." : "Create Workspace"}
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!!errors.name || isChecking || isCreating}
            loading={isCreating}
          />
      </form>
    </>
  );
}
