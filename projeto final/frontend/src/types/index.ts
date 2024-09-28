export type User = {
    id: string
    name: string
    username: string
    email: string
    password: string
    isAdmin: boolean
    isSuperAdmin: boolean
}

export type Quote = {
    id: string
    annotation: Annotation
    text: string
    startingPage: string
    endingPage: string
    note: string
}

export type Annotation = {
    id: string
    isPublic: boolean
    userId: string
    creatorUsername: String
    workTitle: string
    workAuthors: string
    quotes: Quote[]
}