import mongoose, { Model } from "mongoose";

export interface IEducationSchema extends Document {
    institution: string,
    degree: string,
    startedFrom: string,
    endedAt: string,
    _id: mongoose.Types.ObjectId
}

export type IEducationModel = Model<IEducationSchema>

const EducationSchema = new mongoose.Schema<IEducationSchema, IEducationModel>({
    institution: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    startedFrom: {
        type: String,
        required: true
    },
    endedAt: {
        type: String,
        required: true
    }
})

export const EducationModel: IEducationModel = mongoose.models?.Education || mongoose.model('Education', EducationSchema)