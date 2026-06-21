import { z } from "zod";

export const profileSchema = z.object({
    full_name: z.string().min(3, "Full name is required"),
    email: z.email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
})