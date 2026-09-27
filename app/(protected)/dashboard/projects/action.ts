'use server'

import { storage } from "@/firebase"
import { Project } from "@/models/project"
import { connect } from "@/utils/connect"

import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { revalidateTag } from "next/cache"

export const addProject = async (prev: any, data: FormData) => {
    const newData = Object.fromEntries(data)
    const { title, description, skills, repo, liveDemo } = newData
    const image = data.get('image') as File

    let imageUrl = ''

    const imageRef = ref(storage, `portfolio/project/${image.name}`)
    try {
        const uploadbytes = await uploadBytes(imageRef, image)
        imageUrl = await getDownloadURL(uploadbytes.ref)

    } catch (error) {
        console.log(error)
        return {
            type: 'error',
            message: 'Error occured while uploading image'
        }
    }
    try {
        await connect()
        await Project.create({
            title,
            description,
            skills,
            image: imageUrl,
            repo,
            liveDemo
        })
        revalidateTag('projects')
        return {
            type: 'success',
            message: "Project added successfully"
        }
    } catch (error) {
        console.log(error)
        return {
            type: 'error',
            message: 'An unknown error occured'
        }
    }

}