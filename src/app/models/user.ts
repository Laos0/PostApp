// class to build the user object and send it to the backend nodejs
export class User{

    // id is auto generated on backend
    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;
    private password: string;

    constructor(fName: string, lName: string, email: string, password: string){
        this.firstName = fName;
        this.lastName = lName;
        this.email = email;
        this.password = password;
    }
}