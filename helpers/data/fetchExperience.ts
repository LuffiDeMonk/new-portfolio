import { unstable_cache as cache } from 'next/cache'
import { Experience, IExperience } from "@/models/experience"
import { connect } from "@/utils/connect"

export const getExperience = cache(async () => {
    try {
        if (!process.env.MONGODB_URL) return [];
        const conn = await connect();
        if (!conn) return [];
        const data: Array<IExperience> = await Experience.find({});
        return data || [];
    } catch (error) {
        console.error("Error fetching experience data:", error);
        return [];
    }
},
    ['experience'],
    {
        revalidate: 3600,
        tags: ['experience']
    }
)
