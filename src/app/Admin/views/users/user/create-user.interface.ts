export class AddUser {
    firstname: string;
    lastname: string;
    phone: number | null;
    role: string;
    email: string;
    password: string;
    file: string;
   
   

    constructor() {
        this.firstname = '';
        this.lastname = '';
        this.phone = null;
        this.role = '';
        this.email = '';
        this.password = '';
        this.file = '';
    }
}