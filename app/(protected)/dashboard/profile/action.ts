'use server'

import { Profile } from "@/models/profile"
import { connect } from "@/utils/connect"
import { ProfileFormValidation } from "@/validation/ProfileFormValidation"
import { z } from "zod"

export const addProfile = async (prev: any, data: z.infer<typeof ProfileFormValidation>) => {
    try {
        await connect()
        const validatedFields = ProfileFormValidation.safeParse(data)
        if (!validatedFields.success) {
            return {
                message: 'Invalid form details',
                type: 'error'
            }
        }
        const { description, email, firstName, github, lastName, linkedin, phone } = validatedFields.data

        await Profile.create({ firstName, lastName, description, email, phone, github, linkedin })

        return {
            message: "Profile data added successfully",
            type: 'success'
        }

    } catch (error) {
        console.log(error)
        return {
            message: 'An unknown error occured',
            type: 'error'
        }
    }
    console.log(data)
}