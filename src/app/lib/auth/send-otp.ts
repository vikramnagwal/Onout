import { sendViaNodemailer } from "@/packages/email/send-via-nodemailer";
import { generateOTP } from "./generate-otp";

export async function sendOTPEmail({ email, name }: { email: string; name: string }) {
   const code = generateOTP();

   const sendMail = await sendViaNodemailer({
        email,
        subject: "Verify your email address",
        text: `Your OTP code is ${code}`,
        html: {
            dangerouslySetInnerHTML: {
                __html: `
                <div style="padding: 20px; font-family: Arial, sans-serif;">
                    <h1 style="color: #333;">Hello ${name},</h1>
                    <p style="color: #555;">Your OTP code is <strong>${code}</strong></p>
                    <p style="color: #555;">Please use this code to verify your email address.</p>
                </div>
                `
            }
        },
   })

    if (sendMail instanceof Error) {
          throw new Error(sendMail.message || "Failed to send OTP email");
    }
    return sendMail;

}