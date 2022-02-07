import { Social } from './shared.model';

export interface FooterData{
    aboutUs: AboutUsFooter;
    contact: ContactFooter;
    menu: MenuFooter;
}

export interface AboutUsFooter{
    title: string;
    description: string;
}

export interface ContactFooter{
    title: string;
    address: Address;
    phones: Array<string>;
    email: string;
    social: Array<Social>;
}

export interface Address{
    name: string;
    link: string;
}

export interface MenuFooter{
    title: string;
    routes: Array<string>;
}