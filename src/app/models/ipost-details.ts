// interface to handle the post details response on nodejs
export interface IPostDetails {
    id: number;
    userId: number;
    title: string;
    text: string;
    views: number;
    date: string;
    userName?: string;
}