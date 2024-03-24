import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const ProjectFormValidation = z.object({
    title: z.string().min(1, 'This is a required field'),
    description: z.string().min(1, "This is a required field"),
    skills: z.string().min(1, 'This is a required field'),
    image: z.any()
        .refine(files => files != undefined, "Required ")
        .refine(file => ACCEPTED_IMAGE_TYPES.includes(file?.[0]?.type), "Unsupported file format")

})