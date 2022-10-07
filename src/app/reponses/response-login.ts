import { ILoginRes } from "../models/ilogin-res";

export interface ResponseLogin{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isLoggedIn: boolean;
    emailExist: boolean;
    passwordMatch: boolean;
    isQueryGood: boolean;
}