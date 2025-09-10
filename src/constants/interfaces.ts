export interface COMMITTEE {
    name: string,
    role: string,
    favourite_game: string,
    bio: string,

    importance: number
}

export interface ESPORT {
    discord: string,
    colour: string
}

export interface EVENT {
    name: string,
    startDate: Date,
    endDate: Date,

    location: string,
    description: string,
    status: string
}
