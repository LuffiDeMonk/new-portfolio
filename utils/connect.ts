import mongoose from "mongoose";

export const connect = async () => {
    if (mongoose.connections[0].readyState) return mongoose.connections[0];

    if (!process.env.MONGODB_URL) {
        return null;
    }

    try {
        return await mongoose.connect(`${process.env.MONGODB_URL}`, {
            serverSelectionTimeoutMS: 5000,
        });
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return null;
    }
}