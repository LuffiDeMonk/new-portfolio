import mongoose from "mongoose";

type IProject = {
    title: string,
    description: string,
    image: string,
    skills: string
}

const ProjectSchema = new mongoose.Schema<IProject>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        skills: { type: String, required: true }
    }
)

export const Project = mongoose.models?.Project || mongoose.model('Project', ProjectSchema)