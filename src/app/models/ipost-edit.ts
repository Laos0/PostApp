// interface to handle the edited post response from nodejs
export interface IPostEdit{
    id: number,
    userId: number,
    title: string,
    text: string,
}