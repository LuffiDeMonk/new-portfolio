import { IProfile, Profile } from "@/models/profile";
import { connect } from "@/utils/connect";
import { unstable_cache } from "next/cache";

export const getProfile = unstable_cache(async () => {
    try {
        await connect()
        const profileInfo = await Profile.find({})
        return profileInfo
    } catch (error) {
        console.log(error)
    }
},
    ['profile'],
    {
        tags: ['profile']
    }
)

