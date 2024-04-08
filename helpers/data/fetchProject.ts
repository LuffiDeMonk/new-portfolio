import { IProject, Project } from "@/models/project"
import { connect } from "@/utils/connect"
import { unstable_cache } from "next/cache"

export const getProject = unstable_cache(async () => {
    try {
        await connect()
        const projects: Array<IProject> = await Project.find({})
        return projects
    } catch (error) {
        console.log(error)
    }
},
    ['projects'],
    {
        tags: ['projects']
    }
)