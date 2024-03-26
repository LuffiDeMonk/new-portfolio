export const GetSkills = async <T>(): Promise<T> => {
    const response = await fetch(`${process.env.HOMEPAGE}/api/skills`, {
        next: {
            revalidate: 3600,
            tags: ['skill']
        }
    })
    return response.json()
}