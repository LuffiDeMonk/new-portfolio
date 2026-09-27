import { IProfile, Profile } from "@/models/profile";
import { connect } from "@/utils/connect";
import { unstable_cache as cache } from "next/cache";

export const getProfile = cache(async () => {
    try {
        await connect()
        const profileInfo: Array<IProfile> = await Profile.find({})
        return profileInfo
    } catch (error) {
        console.log(error)
    }
},
    ['profiles'],
    {
        tags: ['profiles'],
        revalidate: 3600
    }
)

