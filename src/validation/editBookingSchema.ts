import { z } from "zod";

export const editBookingSchema = z.object({
    breakfast: z.boolean().optional(),
    confirmation: z.boolean()
    // confirmation: z.literal(true, {
    //     errorMap: () => ({message:'You must confirm the payment first'})
    // })
});

export type editBookingFormValues = z.infer<typeof editBookingSchema>;
