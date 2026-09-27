import mongoose from "mongoose";

export const connect = async () => {
    if (mongoose.connections[0].readyState) return null

    try {
        await mongoose.connect(`${process.env.MONGODB_URL}`)
    } catch (error) {
        console.log(error)
    }
}