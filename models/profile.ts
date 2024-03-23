import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
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

export const Profile = mongoose.models?.Profile || mongoose.model("Profile", ProfileSchema)