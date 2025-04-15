import { useForm } from "react-hook-form";
import { LinkFormSchema, linkFormSchema } from "@/app/lib/zod/schema/link-schema";

export function LinkForm() {
    const {register, handleSubmit, watch, formState:{errors}, setError, clearErrors} = useForm<LinkFormSchema>()
    
    return (
        <div>

        </div>
    )
}