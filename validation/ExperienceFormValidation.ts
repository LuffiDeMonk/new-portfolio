import { z } from 'zod'

export const ExperienceFormValidation = z.object({
    title: z.string().min(1, "Job title is a required field"),
    companyName: z.string().min(1, "Company name is required"),
    description: z.string().min(1, "Job description is required"),
    // from: z.string().min(1, 'Job starting year required'),
    // to: z.string().min(1, "Job ending year required"),
    from: z.date({
        required_error: "This is a required field"
    }),
    to: z.date({
        required_error: "This is a required field"
    })
})