"use client";

import { set, z } from "zod";
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
import { Info } from "../icons/info";
import { Stars } from "../icons/stars";
import { useCookie } from "@/packages/hooks/use-cookie";

type CreateWorkspaceFormProps = z.infer<typeof CreateWorkspaceSchema>;

const DEBOUNCE_DELAY = 800;
const MIN_WORKSPACE_NAME_LENGTH = 2;

export function CreateWorkspaceForm() {
	const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [workspaceName, setWorkspaceName] = useState<string>("");

  const [spaceCookie, setSpaceCookie] = useCookie("workspace_Cookies", "notfound", { expires: 7 });
	const router = useRouter();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
		setError,
		clearErrors,
	} = useForm<CreateWorkspaceFormProps>({
		defaultValues: {
			name: "",
		},
	});

	const slug = watch("name");
	const debouncedWorkspaceName = useDebounce(slug, DEBOUNCE_DELAY);

	const { executeAsync: executeNameCheck, status: checkStatus } = useAction(
		checkWorkspaceExists,
		{
			onSuccess: (result) => {
				const isTaken = result.data;
				if (isTaken) {
					setIsAvailable(false);
					setError("name", {
						type: "manual",
						message: "Workspace name already taken",
					});
				} else {
					setIsAvailable(true);
				}
			},
			onError: (error) => {
				toast.error("Error checking workspace existence");
				setError("name", {
					type: "manual",
					message: "failed to check workspace name",
				});
				setIsAvailable(null);
			},
		},
	);

	async function fetchWorkspaceExistance() {
		clearErrors("name");
		const isValidWorkspaceName = await CreateWorkspaceSchema.safeParseAsync({
			name: debouncedWorkspaceName,
		});
		if (
			isValidWorkspaceName.success &&
			debouncedWorkspaceName.length > MIN_WORKSPACE_NAME_LENGTH
		) {
			setIsAvailable(null);
			clearErrors("name");
			await executeNameCheck({ name: debouncedWorkspaceName });
		}
		return;
	}
// TODO: if workspace of user already exists, show him/her existing workspace. don't show create new workspace form redirect him to existing workspace
	async function onSubmit(data: CreateWorkspaceFormProps) {
		try {
      if (isAvailable) {
		    setIsCreating(true);
        const { name } = data;
        setWorkspaceName(name);
        const response = await fetch("/api/workspace", {
          method: "POST",
          body: JSON.stringify({ name }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (response.ok) {
          toast.success("Workspace created successfully");
          router.push(`/${name}/inbox`);
          setSpaceCookie(name);
        } else if (response.status === 409) {
          const workspaceName = result.workspaceSlug;
          toast.error(
            `Workspace \`${workspaceName}\` already exists at your email`
          );
		  router.push(`/${workspaceName}/inbox`);
        } else {
          toast.error("Error creating workspace");
        }
      }
    } finally {
      setIsCreating(false);
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
            onChange={(e) => {
              setWorkspaceName(e.target.value);
            }}
            type="text"
            icon={<Stars className="size-4 opacity-80" />}
            iconContent="generate a random workspace name"
            error={errors.name?.message}
            className={cn(
              "my-2",
              isAvailable && "border-green-500 focus-visible:ring-green-300",
              errors.name && "border-red-500 focus-visible:ring-red-300"
            )}
            autoComplete="off"
            required
          />

          <Input
            value={workspaceName ? workspaceName.replaceAll(" ", "-") : ""}
            placeholder="your workspace name"
            icon={<Info className="p-1 opacity-80" />}
            iconContent="your workspace name will be look like this"
            readOnly
          />

          <span className="text-sm text-red-500/80 min-h-[28px] flex items-end justify-center mb-2">
            {errors.name?.message && (
              <>
                <AlertIcon /> {errors.name.message}
              </>
            )}
          </span>
        </div>
        <div className="flex flex-col items-center mb-4">
          <div className="text-sm text-neutral-500 mb-4">
            Workspace name must be at least {MIN_WORKSPACE_NAME_LENGTH}{" "}
            characters long and can only contain letters, numbers, and hyphens.
          </div>
          <div className="text-sm text-neutral-500 mb-4">
            Workspace name will be used in your workspace URL, so choose wisely!
          </div>
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
