import { z } from "zod";

export const newRoomSchema = z.object({
    roomName:z.string().min(2, {message:"Room name must be 2 or more characters long"}),
    maximumCapacity: z.number({message:"Maximum capacity must be greater than 0"}),
    regularPrice:z.number({message:"Price must be greater than 0"}).positive(),
    discount:z.number(),
    description:z.string({message:"Description must be 5 or more characters long"}),
    roomPhoto:z.string({message:"You must include photo"})
})

export type newRoomValues = z.infer<typeof newRoomSchema>