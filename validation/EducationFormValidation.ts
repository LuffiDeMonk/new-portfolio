import { z } from "zod";

export const EducationFormValidation = z.object({
    institution: z.string({
        required_error: "This is a required field"
    }),
    degree: z.string({
        required_error: "This is a required field"
    }),
    startedFrom: z.date({
        required_error: "This is a required field"
    }),
    endedAt: z.date({
        required_error: "This is a required field"
    })
})