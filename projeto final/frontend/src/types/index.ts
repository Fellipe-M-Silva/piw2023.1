export type User = {
    id: string
    name: string
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
    workTitle: string
    workAuthors: string
    quotes: Quote[]
}

// export type Work = {
//     id: string
//     title: string
//     edition: string
//     publisher: string
//     publishingYear: number
//     authors: Author[]
// }

export type Author = {
    id: string
    name: string
}