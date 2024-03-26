'use server'

import FileUpload from "@/helpers/fileUpload"
import { ISkill, Skill } from "@/models/skill"
import { connect } from "@/utils/connect"
import { revalidatePath, revalidateTag } from "next/cache"

export const addSkill = async (prev: any, data: FormData) => {
    const { title } = Object.fromEntries(data)
    const image = data.get('image') as File

    try {
        await connect()
        const isNameAvailable = await Skill.find({ title })
        if (isNameAvailable.length !== 0) {
            return {
                type: 'error',
                message: 'Skill already exists'
            }
        }
        const url = await FileUpload(image, "portfolio/skills")
        if (url?.length === 0) {
            return {
                type: 'error',
                message: 'Error occured while uploading image'
            }
        }
        Skill.create<ISkill>({
            title,
            image: url
        })
        revalidateTag('skill')
        return {
            type: 'success',
            message: 'Data fetched successfully'
        }
    } catch (error) {
        return {
            type: 'error',
            message: "An unknown error occured"
        }
    }
}