export class Class{
    public name: string
    public code: string
    public subject: string
    public owner: string
    // public userList:String[];
    constructor(name: string,code:string,subject:string,owner:string){
        this.name = name
        this.code=code
        this.subject=subject
        this.owner=owner
    }
}