import { unstable_cache as cache } from 'next/cache'
import { Experience, IExperience } from "@/models/experience"
import { connect } from "@/utils/connect"

export const getExperience = cache(async () => {
    try {
        await connect()
        const data: Array<IExperience> = await Experience.find({})
        return data
    } catch (error) {
        console.log(error)
        throw new Error('Error while getting experience details')
    }
},
    ['experience'],
    {
        revalidate: 3600,
        tags: ['experience']
    }
)
