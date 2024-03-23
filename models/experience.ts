import mongoose from "mongoose";

const ExperienceSchema = new mongoose.Schema({
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


export const Experience = mongoose.models?.Experience || mongoose.model('Experience', ExperienceSchema)