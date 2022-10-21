// interface to intercept the user response from nodejs
export interface IUser{
    // id is auto generated on backend
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}