import { IProfile, Profile } from "@/models/profile";
import { connect } from "@/utils/connect";
import { unstable_cache as cache } from "next/cache";

export const getProfile = cache(async () => {
    try {
        if (!process.env.MONGODB_URL) return [];
        const conn = await connect();
        if (!conn) return [];
        const profileInfo: Array<IProfile> = await Profile.find({});
        return profileInfo || [];
    } catch (error) {
        console.error("Error fetching profile data:", error);
        return [];
    }
},
    ['profiles'],
    {
        tags: ['profiles'],
        revalidate: 3600
    }
)
