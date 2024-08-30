import { z } from "zod";

// Custom validation to ensure the file is an instance of File
const fileSchema = z
  .instanceof(File, { message: "You must upload a valid image file" })
  .refine((file) => file.size > 0, { message: "The file cannot be empty" });

export const newRoomSchema = z.object({
  roomName: z
    .string({ required_error: "Room name is required" })
    .min(2, { message: "Room name must be 2 or more characters long" }),

  maximumCapacity: z
    .string({ required_error: "Maximum capacity is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Maximum capacity must be a number greater than 0",
    }),

  regularPrice: z
    .string({ required_error: "Regular price is required" })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Regular price must be a positive number",
    }),

  discount: z.string({ required_error: "Discount is required" }).refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Discount must be a number between 0 and 100",
    }
  ),

  description: z
    .string({ required_error: "Description is required" }).min(1, {message:"Description must be longer"})
    // .min(5, { message: "Description must be 5 or more characters long" }),
,
  roomPhoto: fileSchema.or(
    z.string({ required_error: "You must upload a photo" })
  ),
});

export type newRoomValues = z.infer<typeof newRoomSchema>;
