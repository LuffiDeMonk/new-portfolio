import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        skills: { type: String, required: true }
    }
)

export const Project = mongoose.models?.Project || mongoose.model('Project', ProjectSchema)