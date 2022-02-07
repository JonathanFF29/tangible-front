export interface Routes {
    home: Route;
    services: RoutesServices;
    laboratory: Route;
    store: Route;
    blog: Route;
    aboutUs: Route;
    cart: Route;
    userHome: Route;
    payments: Route;
}

export interface RoutesServices {
    path: string;
    title: string;
    icon: string;
    children: {
        architecture: Route,
        representation: Route,
        experienceDesign: Route
    }
}

export interface Route {
    path: string;
    title: string;
    icon: string;
}
