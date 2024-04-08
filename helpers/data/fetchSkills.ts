import { Skill } from "@/models/skill";
import { connect } from "@/utils/connect";
import { unstable_cache } from "next/cache";


export const FetchSkills = unstable_cache(async <T>() => {
    try {
        await connect()
        const Skills: Array<T> = await Skill.find({})
        return Skills
    } catch (error) {
        console.log(error)
    }
},
    ['skills'],
    {
        tags: ['skills']
    }
)