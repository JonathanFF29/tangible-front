import { Routes } from './../models/routes.model';

export const ALL_ROUTES = {
    home: {
        path: "inicio",
        title: "Inicio",
        icon: ""
    },
    services: {
        path: "servicios",
        title: "Servicios",
        icon: ""
    },
    laboratory: {
        path: "laboratorio",
        title: "Laboratorio",
        icon: ""
    },
    store: {
        path: "tienda",
        title: "Modelos 3D",
        icon: ""
    },
    blog: {
        path: "blog",
        title: "Blog",
        icon: ""
    },
    aboutUs: {
        path: "nosotros",
        title: "Nosotros",
        icon: ""
    },
    cart: {
        path: "carrito",
        title: "Carrito",
        icon: "icon-cart"
    },
    architecture: {
        path: "arquitectura",
        title: "Arquitectura",
        icon: "icon-architecture"
    },
    representation: {
        path: "representacion",
        title: "Representación",
        icon: "icon-representation"
    },
    experienceDesign: {
        path: "diseño-de-experiencia",
        title: "Diseño de experiencia",
        icon: "icon-experiences"
    },
    userHome: {
        path: "user-home",
        title: "Usuario",
        icon: "icon-experiences"
    },
    payments: {
        path: "payments",
        title: "Carrito",
        icon: "icon-experiences"
    }
}

export const ROUTES: Routes = { //with hierarchy
    home: ALL_ROUTES.home,
    services: {
        path: ALL_ROUTES.services.path,
        title: ALL_ROUTES.services.title,
        icon: ALL_ROUTES.services.icon,
        children: {
            architecture: ALL_ROUTES.architecture,
            representation: ALL_ROUTES.representation,
            experienceDesign: ALL_ROUTES.experienceDesign
        }
    },
    laboratory: ALL_ROUTES.laboratory,
    store: ALL_ROUTES.store,
    blog: ALL_ROUTES.blog,
    aboutUs: ALL_ROUTES.aboutUs,
    cart: ALL_ROUTES.cart,
    userHome: ALL_ROUTES.userHome,
    payments: ALL_ROUTES.payments
}



export const ROUTES_NAVIGATION: Array<string> = [
    "home", "services", "laboratory", "store", "blog", "aboutUs"
]

export const ROUTES_FOOTER: Array<string> = [
    "aboutUs", "architecture", "representation", "experienceDesign", "store", "blog"
]

