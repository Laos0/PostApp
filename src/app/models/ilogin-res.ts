// interface to intercept login response from nodejs server
export interface ILoginRes{
    isLoggedIn: boolean;
    emailExist: boolean;
    passwordMatch: boolean;
    isQueryGood: boolean;
}