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
    annotationId: string
    text: string
    startingPage: string
    endingPage: string
    note: string
}

export type Quote2 = {
    id: string
    annotation: Annotation2
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

export type Annotation2 = {
    id: string
    isPublic: boolean
    user: User
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