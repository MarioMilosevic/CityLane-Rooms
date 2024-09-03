import { z } from "zod";

export const newRoomSchema = z.object({
  minNights: z.coerce
    .number()
    .positive({ message: "There must be at least 1 night" }),
  maxNights: z.coerce
    .number()
    .max(120, { message: "Maximum nights/booking is 120 nights" })
    .positive({ message: "Maximum nights/booking must be at least 1" }),
  maxGuests: z.coerce
    .number()
    .max(8, { message: "Maximum guests/booking is 8 guests" })
    .positive({ message: "There must be at least 1 guest" }),
  breakfastPrice: z.coerce
    .number()
    .max(12, { message: "Breakfast can't be higher than 12$" })
    .positive({ message: "Breakfast can't be free" }),
});

export type newRoomValues = z.infer<typeof newRoomSchema>;
