import { z } from 'zod'

export const ProfileFormValidation = z.object({
    firstName: z.string().min(1, "This is a required field"),
    lastName: z.string().min(1, "This is a required field"),
    email: z.string().email("Provide valid email address"),
    description: z.string().min(1, "This is a required field"),
    phone: z.string().optional(),
    github: z.string().min(1, "This is a required field"),
    linkedin: z.string().min(1, "This is a required field")
})