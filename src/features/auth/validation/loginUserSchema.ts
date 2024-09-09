import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type loginUserFormValues = z.infer<typeof loginUserSchema>;
