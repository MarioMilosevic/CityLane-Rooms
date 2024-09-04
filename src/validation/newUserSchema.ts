import { z } from "zod";

const passwordForm = z
  .object({
    password: z.string(),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export const newUserSchema = z
  .object({
    fullName: z.string().min(2, {
      message: "Full name is required",
    }),
    emailAddress: z.string().email({
      message: "Please provide a correct email",
    }),
  })
  .merge(passwordForm);
