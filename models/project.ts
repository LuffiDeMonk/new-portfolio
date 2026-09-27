import mongoose, { Document, Model } from "mongoose";

export interface IProject extends Document {
    title: string,
    description: string,
    image: string,
    skills: string,
    liveDemo: string,
    repo: string
}

export type ProjectModel = Model<IProject>

const ProjectSchema = new mongoose.Schema<IProject, ProjectModel>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        skills: { type: String, required: true },
        liveDemo: { type: String, required: true },
        repo: { type: String, required: true }
    }
)

export const Project: ProjectModel = mongoose.models?.Project || mongoose.model<IProject, ProjectModel>('Project', ProjectSchema)