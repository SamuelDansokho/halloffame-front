export class User{
    username: string;
    displayname: string;
    password: string;
    email: string;
    isAdmin: boolean;
    
    
    constructor(username: string,displayname: string,password: string, email: string,  isAdmin: boolean){
        this.username= username;
        this.password=password;
        this.email=email;
        this.displayname=displayname;
        this.isAdmin=isAdmin;
    }
}