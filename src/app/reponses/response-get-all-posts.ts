export interface ResponseGetAllPosts{
    // We do not need the id of the post
    
    userId: number;
    title: string;
    text: string;
    views: number;
    date: string;
}