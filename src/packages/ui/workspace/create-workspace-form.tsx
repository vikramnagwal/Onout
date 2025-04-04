'use client';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEffect } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useAction } from "next-safe-action/hooks";
import { checkWorkspaceExists } from "@/app/lib/actions/check-workspace-exists-action";
import { cn } from "@/packages/utils/functions/cn";
import { toast } from "sonner";


export const WorkspaceFormSchema = z.object({
    name: z.string().min(3, { message: "Workspace name must be greater than 3 characters."}).max(199, { message: "Wow hold on, that's a long name!"})
})

type CreateWorkspaceFormProps = z.infer<typeof WorkspaceFormSchema>

export function CreateWorkspaceForm() {

    const { register, handleSubmit, watch, formState: { errors }, getValues } = useForm<CreateWorkspaceFormProps>({
        defaultValues: {
            name: ""
        }
    })

    const slug = watch("name")
    const isValidWorkspaceName = WorkspaceFormSchema.safeParse({ name: slug }).success
    const debouncedWorkspaceName = useDebounce(slug, 800);

    const { executeAsync, isPending } = useAction(checkWorkspaceExists, {
        onSuccess: (data) => {
          console.log("Workspace name check result:", data);
        },
    })

    async function fetchWorkspaceExistance() {
        if (isValidWorkspaceName && debouncedWorkspaceName.length > 3) {
          await executeAsync({ name: debouncedWorkspaceName })
        }
        return
    }

    async function onSubmit() {
      const response = await fetch("/api/workspace", {
        method: "POST",
        body: JSON.stringify({ name: debouncedWorkspaceName }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await response.json()
      console.log("Workspace creation response:", data)
    }

    useEffect(() => { 
      fetchWorkspaceExistance();
    }, [debouncedWorkspaceName]);

    return (
      <>
        <form
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            {...register("name", { required: true })}
            placeholder="Workspace Name"
            type="text"
            error={errors.name?.message}
            className={cn(
              "mb-4",
              errors.name && "border-red-500 focus-visible:ring-red-300"
            )}
            autoComplete="off"
            onBlur={async () => {
              await executeAsync({ name: getValues("name") });
            }}
            required
          />
          {errors.name?.message}
          <Button
            text={"Create Workspace"}
            type="submit"
            variant="primary"
            className="w-full"
            disabled={!!errors.name || isPending}
            loading={isPending}
          />
        </form>
      </>
    );
}