import { z } from "zod";

export const newRoomSchema = z.object({
  name: z.string().min(2, {
    message: "Room name must be 2 or more characters long",
  }),

  capacity: z.coerce
    .number({ required_error: "Maximum capacity is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Maximum capacity must be bigger than 0",
    }),

  regularPrice: z.coerce
    .number({ required_error: "Regular price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Regular price must be a bigger than 0",
    }),

  discount: z.coerce.number().refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Discount must be between 1-100",
    }
  ),

  description: z
    .string({ required_error: "Description is required" })
    .min(5, { message: "Description must be 5 or more characters long" }),

  image: z.any(),
});

export type newRoomValues = z.infer<typeof newRoomSchema>;
