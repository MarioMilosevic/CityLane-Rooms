import { z } from "zod";

export const newUserSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Full name is required",
    }),
    emailAddress: z.string().email({
      message: "Please provide a correct email",
    }),
  })
  .extend({
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    repeatPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export type userFormValues = z.infer<typeof newUserSchema>;
