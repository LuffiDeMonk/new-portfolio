import { IProject, Project } from "@/models/project"
import { connect } from "@/utils/connect"

export const getProject = async () => {
    try {
        await connect()
        const projects: Array<IProject> = await Project.find({})
        return projects
    } catch (error) {
        console.log(error)
    }
}