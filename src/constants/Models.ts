export interface Post{
    id?: number,
    title: string,
    body: string,
    createdIn: string,
    image?: string
}

export interface FileUi{
    name: string,
    sourceFile: File
}