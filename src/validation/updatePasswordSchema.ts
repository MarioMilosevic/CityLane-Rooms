import { z } from "zod";

export const updateUserPasswordSchema = z
  .object({})
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

export type updatePasswordFormValues = z.infer<typeof updateUserPasswordSchema>;
