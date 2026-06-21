import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(30, "Username cannot exceed 30 characters"),
    full_name: z.string().min(3, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(1, "Ohone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string(),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female", "other"], "Gender is required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password is required"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
    token: z.string().min(1, "Token is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

