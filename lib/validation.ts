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

export const RegisterFormValidation = z.object({
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
    birthDate: z.date(),
    gender: z 
            .enum(["male", "female", "other"], {
                error: "Gender is required",
            }),
    address: z.string().trim().optional(),
    occupation: z.string().trim().optional(),
    emergencyContactName: z.string().trim().optional(),
    emergencyContactNumber: z.string().trim().optional(),
    primaryPhysician: z.string().trim().optional(),
    insuranceProvider: z.string().trim().optional(),
    insurancePolicyNumber: z.string().trim().optional(),
    allergies: z.string().trim().optional(),
    currentMedication: z.string().trim().optional(),
    familyMedicalHistory: z.string().trim().optional(),
    pastMedicalHistory: z.string().trim().optional(),
    identificationType: z.string().trim().optional(),
    identificationNumber: z.string().trim().optional(),
    identificationDocument: z.any().optional(),
    privacyConsent: z.boolean(),
});

export type UserFormValues = z.infer<typeof UserFormValidation>;
export type RegisterFormValues = z.infer<typeof RegisterFormValidation>;
