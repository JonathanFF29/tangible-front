import { Injectable } from '@angular/core';
//import { KeyToken, KeyUserData } from 'src/app/data/general.data';
import { isNullOrUndefined } from 'util';
//import { DataUser } from 'src/app/models/login.model';

//import * as CryptoJS from 'crypto-js';

const randomKey = "ACb{Hj&]9@]OYg$!;eZi_ñ_y:ik'T1jO?..";

@Injectable({
    providedIn: 'root'
})
export class SharedService {
    constructor() { }

   /* public static IsUserLogged(): boolean {
        //if(!isNullOrUndefined(this.GetToken())){
            if(!isNullOrUndefined(this.GetLocalStorage(KeyUserData))){
                return true;
            }
        //}
    
        return false;
    }

    public static HasToken(): boolean{
        return !isNullOrUndefined(this.GetLocalStorage(KeyToken));
    }

    public static GetToken(): string{
        return this.GetLocalStorage(KeyToken);
    }

    public static SetToken(token: string){
        this.SetLocalStorage(KeyToken, token);
    }

    public static GetUserData(): DataUser{
        return JSON.parse(this.GetLocalStorage(KeyUserData));
    }

    public static SetUserData(data: DataUser){
        this.SetLocalStorage(KeyUserData, JSON.stringify(data));
    }



    private static GetLocalStorage(key:string){
        let value: string = localStorage.getItem(key);
        if(value)
            return this.decrypt(value);

        return null;
    }

    private static SetLocalStorage(key: string, data: string){
        localStorage.setItem(key, this.encrypt(data));
    }



    public static encrypt(value : string) : string{
        return CryptoJS.AES.encrypt(value, randomKey).toString();
    }

    public static decrypt(textToDecrypt : string){
        return CryptoJS.AES.decrypt(textToDecrypt, randomKey).toString(CryptoJS.enc.Utf8);
    }*/
}


