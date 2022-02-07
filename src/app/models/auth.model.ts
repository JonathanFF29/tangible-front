import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class SignupRequest{
    email: string;
    password: string;
    name: string;
    gender: string;
    birthdate: Date;
    country: string;
    city: string;
    profession: string;

    constructor(form: SignupFormValue){
        this.email = form.email;
        this.password = form.password;
        this.name = form.name;
        this.gender = form.gender;
        this.birthdate = new Date(form.birthdate.year, form.birthdate.month-1, form.birthdate.day );
        this.country = form.country;
        this.city = form.city;
        this.profession = form.profession;
    }
}

export interface SignupFormValue{
    email: string;
    password: string;
    pasword2: string;
    name: string;
    gender: string;
    birthdate: NgbDateStruct,
    country: string;
    city: string;
    profession: string;
}

export class LoginRequest{
    email: string;
    password: string;

    constructor(form: LoginFormValue){
        this.email = form.email;
        this.password = form.password;
    }
}

export interface LoginFormValue{
    email: string;
    password: string;
}

export class LoginSocialNetworkRequest{
    email: string;
    password: string;
    name: string;
    socialNetwork: string;

    constructor(form: LoginSocialNetworkFormValue){
        this.email = form.email;
        this.password = form.password;
        this.name = form.name;
        this.socialNetwork = form.socialNetwork;
    }
}

export interface LoginSocialNetworkFormValue{
    email: string;
    password: string;
    name: string;
    socialNetwork: string;
}

export class ResendEmailRequest{
    email: string;

    constructor(form: ResendEmailFormValue){
        this.email = form.email;
    }
}

export interface ResendEmailFormValue{
    email: string;
}

export class UpdateUserInfoRequest{
    name: string;
    gender: string;
    birthdate: Date;
    country: string;
    city: string;
    profession: string;
    picture: string;
    url: string;
    description: string;

    constructor(form: UpdateUserInfoFormValue){
        this.name = form.name;
        this.gender = form.gender;
        this.birthdate = new Date(form.birthdate.year, form.birthdate.month-1, form.birthdate.day );
        this.country = form.country;
        this.city = form.city;
        this.profession = form.profession;
        this.picture = form.picture;
        this.description = form.description;
        this.url = form.url;
    }
}

export interface UpdateUserInfoFormValue{
    name: string;
    gender: string;
    birthdate: NgbDateStruct;
    country: string;
    city: string;
    profession: string;
    picture: string
    description: string;
    url: string;
}

