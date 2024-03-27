import { z } from "zod";

export const ContactFormValidation = z.object(
    {
        title: z.string().min(1, 'This is a required field'),
        description: z.string().min(1, 'This is a required field'),
        name: z.string().min(1, "This is a required field"),
        email: z.string().min(1, 'This is a required field').email("Add valid email address")
    }
)