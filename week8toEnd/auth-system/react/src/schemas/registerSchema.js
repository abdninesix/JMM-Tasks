import { z } from "zod";

export const registerSchema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username cannot exceed 30 characters"),

    full_name: z
      .string()
      .min(3, "Full name is required"),

    email: z
      .email("Invalid email address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirm_password: z.string(),

    dob: z.string().min(1, "Date of birth is required"),
  })
  .refine(
    (data) => data.password === data.confirm_password,
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );