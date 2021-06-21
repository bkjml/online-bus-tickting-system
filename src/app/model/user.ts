export class User {
    contact: number;
    email: string;
    name: string;
    userId: number;
    

    constructor(userId : number, name: string, email:string, contact:number){
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.contact = contact;

    }
}