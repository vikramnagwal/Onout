import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

const emailSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type EmailSignUp = z.infer<typeof emailSignUpSchema>;

export function SignUpEmail() {
    const { register, handleSubmit, getValues, watch } = useForm<EmailSignUp>();
    const { executeAsync, isPending} = useAction();
    return (
        <form>
            <input {...register("email")} type="email" placeholder="Email" />
            <input {...register("password")} type="password" placeholder="Password" />
            <button onClick={handleSubmit(async (data) => executeAsync(data))} disabled={isPending}>
                Sign Up
            </button>
        </form>
    )
}