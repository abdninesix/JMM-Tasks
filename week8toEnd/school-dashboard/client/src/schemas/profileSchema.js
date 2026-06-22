import { z } from "zod";

export const profileSchema = z.object({
    full_name: z.string().min(3, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
})

export const changePasswordSchema = z.object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "New password must be at least 8 characters"),
    new_password_confirmation: z.string()
}).refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Passwords do not match",
    path: ["new_password_confirmation"],
});