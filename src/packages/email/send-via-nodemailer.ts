import nodemailer from "nodemailer";
import React, { HtmlHTMLAttributes, ReactElement } from "react";
import { logger } from "../utils/functions/logger";

interface EmailProps {
    email: string;
    subject: string;
    text: string;
    html: HtmlHTMLAttributes<HTMLDivElement>;   
}

export async function sendViaNodemailer({
    email,
    subject,
    text,
    html
}: EmailProps) {
    const transporter = nodemailer.createTransport({
        // @ts-ignore
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
         tls: {
            rejectUnauthorized: false
         }
    })

    if (transporter instanceof Error) {
        logger.error(transporter.message || "Failed to Send email via Nodemailer");
    }

    return await transporter.sendMail({
        from: 'noreply@example.com',
        to: email,
        subject,
        text,
        html
    })
}
