import mongoose, { Document, Model } from "mongoose";


export interface IProfile extends Document {
    firstName: string,
    lastName: string,
    description: string,
    email: string,
    phone: string,
    github: string,
    linkedin: string
}

export type ProfileModel = Model<IProfile>

const ProfileSchema = new mongoose.Schema<IProfile, ProfileModel>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    }
})

export const Profile = mongoose.models?.Profile || mongoose.model<IProfile, ProfileModel>("Profile", ProfileSchema)