export interface IComment{
    id: number,
    userId: number,
    postId: number,
    text: string,
    createdDate: string,
    userName?: string // first name and last name concat 
}