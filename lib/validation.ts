import { z } from "zod";

export const UserFormValidation = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Username must be at least 2 characters.")
        .max(50, "Username must be at most 50 Characters"),

    email: z
        .string()
        .trim()
        .min(1, "Email Address is required")
        .email("Invalid email address."),

    phone: z
        .string()
        .min(1, "Phone number is required")
        .refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Invalid phone number'),
});

export type UserFormValues = z.infer<typeof UserFormValidation>;