interface MovieData {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    genres?: {
        id: number,
        name: string
    }[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface MovieCast {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    profile_path: string,
    character: string,
}

interface TVData {
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    genres?: {
        id: number,
        name: string
    }[],
    id: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    first_air_date: string,
    name: string,
    vote_average: number,
    vote_count: number
}


type MovieVideos = {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
    id: string
}

interface FormErrorStatus {
    type: string,
    message: string
}