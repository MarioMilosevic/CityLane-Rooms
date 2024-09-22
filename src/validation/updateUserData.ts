import { z } from "zod";

export const updateUserDataSchema = z
  .object({
    emailAddress: z.string().email({
      message: "Please provide a correct email",
    }),
    fullName: z.string().min(2, {
      message: "Full name is required",
    }),
    image: z.any(),
  })

export type updateUserDataFormValues = z.infer<typeof updateUserDataSchema>;
