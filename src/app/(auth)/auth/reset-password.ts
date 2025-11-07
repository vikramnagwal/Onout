import * as cron from "cron";
import z from "zod";


let RESET_COUNTER = 3; 

const resetPasswordSchema = z.object({
    token: z.string().min(10).max(100),
    newPassword: z.string().min(8).max(100).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/),
})

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export async function resetPasswordAction(input: ResetPasswordInput): Promise<{ success: boolean; message: string }> {  
    const parsedInput = resetPasswordSchema.safeParse(input);
    if (!parsedInput.success) {
        return { success: false, message: "Invalid input data" };
    }
    return await resetPassword(parsedInput.data);
}

async function resetPassword({
    token,
    newPassword,
}: {
    token: string;
    newPassword: string;        
}): Promise<{ success: boolean; message: string }> {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/reset-password`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, newPassword }),
        }
    );

    if (!response.ok) {
        const error = await response.json();
        return { success: false, message: error.message };
    }
    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    console.log("Next reset available at:", nextDay);

    if (RESET_COUNTER > 0) {
        RESET_COUNTER -= 1;
    } else {
        return { success: false, message: "Too many attempts. Please try next day again later." };
    }
    return { success: true, message: "Password reset successfully" };
}

function resetCounter() {
    RESET_COUNTER = 3;
}
const job = new cron.CronJob("0 2 * * *", resetCounter);
job.start();