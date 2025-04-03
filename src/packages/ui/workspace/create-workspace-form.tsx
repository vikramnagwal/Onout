'use client';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { useEffect, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";


const WorkspaceFormSchema = z.object({
    name: z.string().min(3, { message: "Workspace name must be greater than 3 characters."}).max(199, { message: "Wow hold on, that's a long name!"})
})

type CreateWorkspaceFormProps = z.infer<typeof WorkspaceFormSchema>

export function CreateWorkspaceForm() {

    const [checkWorkspaceName, setCheckWorkspaceName] = useState<boolean>(false)
    const [isPending, setIsPending] = useState<boolean>(false)

    const debouncedWorkspaceName = useDebounce(checkWorkspaceName, 500); // Debounce the workspace name check
    const isValidWorkspaceName = WorkspaceFormSchema.safeParse({ name: debouncedWorkspaceName }).success

    const { register, handleSubmit, formState: { errors } } = useForm<CreateWorkspaceFormProps>({
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = (data: CreateWorkspaceFormProps) => {
        setCheckWorkspaceName(true)
    }

    useEffect(() => {
        // TODO: check if workspace name exists if not then create it
        return () => {
            setCheckWorkspaceName(false)
            // Reset the form or any other cleanup if necessary
        }
    }, [checkWorkspaceName])

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", { required: true })}
          placeholder="Workspace Name"
          type="text"
          error={errors.name?.message}
          className="mb-4"
          autoComplete="off"
        />
        <Button
          text={isPending ? "Creating..." : "Create Workspace"}
          type="submit"
          variant="primary"
          className="w-full"
          disabled={!!errors.name || isPending || checkWorkspaceName}
          loading={isPending}
        />
      </form>
    );
}