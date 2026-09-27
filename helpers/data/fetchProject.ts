import { IProject, Project } from "@/models/project"
import { connect } from "@/utils/connect"
import { unstable_cache as cache } from "next/cache"

export const getProject = cache(async () => {
    try {
        await connect()
        const projects: Array<IProject> = await Project.find({})
        return projects
    } catch (error) {
        console.log(error)
    }
},
    ['projects']
    ,
    {
        revalidate: 3600,
        tags: ['projects']
    }
)