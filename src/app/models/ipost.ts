// interface to handle response on post response from backend nodejs
export interface IPost {
    userId: number;
    title: string;
    text: string;
    views: number;
    date?: string;
}