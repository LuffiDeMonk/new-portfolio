import { IProfile, Profile } from "@/models/profile";
import { connect } from "@/utils/connect";

export const getProfile = async () => {
    try {
        await connect()
        const profileInfo = await Profile.find({})
        return profileInfo
    } catch (error) {
        console.log(error)
    }
}

