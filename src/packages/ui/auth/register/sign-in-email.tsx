import { z } from "zod";
import { useAction } from "next-safe-action/hooks";
// import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRegisterContext } from "./context";
import { Input } from "../../input";

const emailSignUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export type EmailSignUp = z.infer<typeof emailSignUpSchema>;

export function SignUpEmail() {
    const { setEmail, setPassword, setStep } = useRegisterContext();

    const { register, handleSubmit, getValues, formState: { errors }, watch } = useForm<EmailSignUp>();
    const { executeAsync, isPending} = useAction(sendOTPEmail, {
        onSuccess: () => {
            toast.success("Verification Email Sent");
            setEmail(getValues().email);
            setPassword(getValues().password);
            setStep("verify");
        },
        onError: ({error}) => {
            toast.error(
              error.serverError ||
                error.validationErrors?.email?.[0] ||
                error.validationErrors?.password?.[0]
            );
        }
    });
    return (
        <form>
            <Input {...register("email")} type="email" error={errors.email?.message} />
            <Input {...register("password")} type="password" placeholder="Password" error={errors.password?.message} />
            <button onClick={handleSubmit(async (data) => executeAsync(data))} disabled={isPending}>
                Sign Up
            </button>
        </form>
    )
}