import { z } from "zod";

export const emailSchema =  z
        .string()
        .email("Invalid email address")
        .min(1, "Email is required")
        .max(255, "Email must be at most 255 characters long")