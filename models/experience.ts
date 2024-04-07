import mongoose, { Document, Model } from "mongoose";

export interface IExperience extends Document {
    title: string,
    companyName: string,
    description: string,
    from: string,
    to: string,
}

export type ExperienceModel = Model<IExperience>

const ExperienceSchema = new mongoose.Schema<IExperience, ExperienceModel>({
    title: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
})


export const Experience = mongoose.models?.Experience || mongoose.model<IExperience, ExperienceModel>('Experience', ExperienceSchema)