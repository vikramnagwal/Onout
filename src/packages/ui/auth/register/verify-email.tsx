import { Button } from "@ui/button";
import { InputOTP } from "@ui/input-otp";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const codeSchema = z.object({
	code: z.string().length(6, "Code must be 6 characters long").regex(/^\d+$/, "Code must contain only numbers"),
})

type CodeForm = z.infer<typeof codeSchema>;

export function VerifyEmailForm() {
	const [code, setCode] = useState<CodeForm["code"]>();
	const { register, handleSubmit, watch, formState: {errors} } = useForm<CodeForm>();
	console.log(watch("code"));

	// handle verification logic here
	function handleVerification() {

	}
	return (
		<div className="flex p-2">
			<form className="w-full max-w-sm" onSubmit={handleSubmit(handleVerification)}>
				<InputOTP {...register("code", { required: true })} length={6} />
				<Button
					icon={<MailCheck size={24} />}
					text={"Verify"}
					type="submit"
					className="w-full mt-6"
				/>
			</form>
		</div>
	);
}
