'use server'

import { EducationModel } from "@/models/education"
import { connect } from "@/utils/connect"
import { EducationFormValidation } from "@/validation/EducationFormValidation"
import { z } from "zod"

export const addEducation = async (prev: any, data: z.infer<typeof EducationFormValidation>) => {

    const validatedInput = EducationFormValidation.safeParse(data)
    if (!validatedInput.success) {
        return {
            type: "error",
            message: 'Invalid inputs'
        }
    }
    const { institution, degree, endedAt, startedFrom } = validatedInput.data

    try {
        await connect()
        await EducationModel.create(
            {
                institution, degree, endedAt, startedFrom
            }
        )
        return {
            type: 'success',
            message: "Education details added successfully"
        }
    } catch (error) {
        return {
            type: "error",
            message: "An unknown error occured"
        }
    }
}