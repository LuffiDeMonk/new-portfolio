export const getGithubData = async () => {
    const response = await fetch('https://api.github.com/users/luffidemonk')
    if (!response.ok) {
        throw new Error('An unknown error occured while fetching github data')
    }
    return response.json()
}