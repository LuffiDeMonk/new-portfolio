import { ACCEPTED_IMAGE_TYPES } from "@/constants/Mimetypes";
import { z } from "zod";


export const ProjectFormValidation = z.object({
    title: z.string().min(1, 'This is a required field'),
    description: z.string().min(1, "This is a required field"),
    skills: z.string().min(1, 'This is a required field'),
    image: z.any()
        .refine(files => files.length !== 0, "This is a required field")
        .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), "Unsupported file format")

})