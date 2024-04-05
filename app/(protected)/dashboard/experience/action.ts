'use server'

import { Experience } from "@/models/experience"
import { connect } from "@/utils/connect"
import { ExperienceFormValidation } from "@/validation/ExperienceFormValidation"
import { z } from "zod"

export const addExperience = async (prev: any, data: z.infer<typeof ExperienceFormValidation>) => {
    try {
        await connect()
        const validatedFields = ExperienceFormValidation.safeParse(data)
        if (!validatedFields.success) {
            return {
                message: 'Invalid form inputs',
                type: 'error'
            }
        }
        const { companyName, title, description, from, to } = validatedFields.data

        await Experience.create({ companyName, title, description, from, to })
        return {
            message: 'Experience added successfully',
            type: 'success'
        }

    } catch (error) {
        console.log(error)
        return {
            message: 'An unknown error occured',
            type: 'error'
        }
    }
}