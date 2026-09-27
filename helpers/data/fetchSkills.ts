import { Skill } from "@/models/skill";
import { connect } from "@/utils/connect";
import { unstable_cache } from "next/cache";

export const FetchSkills = unstable_cache(async <T>() => {
    try {
        if (!process.env.MONGODB_URL) return [];
        const conn = await connect();
        if (!conn) return [];
        const Skills: Array<T> = await Skill.find({});
        return Skills || [];
    } catch (error) {
        console.error("Error fetching skills data:", error);
        return [];
    }
},
    ['skills'],
    {
        revalidate: 3600,
        tags: ['skills']
    }
)