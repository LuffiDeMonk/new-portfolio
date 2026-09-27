import mongoose, { Model, Schema, model, models } from 'mongoose'

export interface ISkill extends Document {
    _id: mongoose.Types.ObjectId,
    title: string,
    image: string
}

type SkillModel = Model<ISkill>

const SkillSchema = new Schema<ISkill, SkillModel>({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})


export const Skill = models?.Skills || model<ISkill, SkillModel>('Skills', SkillSchema)