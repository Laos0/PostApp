// Interface to intercept the incoming response from nodejs server
export interface IComment{
    id?: number,
    userId: number,
    postId: number,
    text: string,
    createdDate?: string,
    userName?: string // first name and last name concat 
}