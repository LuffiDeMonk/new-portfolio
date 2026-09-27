import { IProject, Project } from "@/models/project"
import { connect } from "@/utils/connect"
import { unstable_cache as cache } from "next/cache"

export const getProject = cache(async () => {
    try {
        if (!process.env.MONGODB_URL) return [];
        const conn = await connect();
        if (!conn) return [];
        const projects: Array<IProject> = await Project.find({});
        return projects || [];
    } catch (error) {
        console.error("Error fetching project data:", error);
        return [];
    }
},
    ['projects']
    ,
    {
        revalidate: 3600,
        tags: ['projects']
    }
)