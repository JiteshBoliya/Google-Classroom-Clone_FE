export class User{
    constructor(
        public id:string,
        public name:string,
        public email:string,
        private token:string
        // private _tokenExpirationDate:Date
    ){}

    // get token(){
    //     if(!this._tokenExpirationDate||new Date()>this._tokenExpirationDate){
    //         return null;
    //     }
    //     return this._token;
    // }    
}