import { FooterData } from 'src/app/models/footer.model';
import { ROUTES, ROUTES_FOOTER } from 'src/app/data/routes.data';
import { SOCIAL_NETWORKS } from 'src/app/data/shared.data';

export const FOOTER: FooterData = {
    aboutUs:{
        title: ROUTES.aboutUs.title,
        description: "Somos un estudio de diseño que crea espacios de experiencias híbridas entre lo físico y lo virtual"
    },
    contact:{
        title: "Contacto",
        address: {
            name: "Carrera 36b #11-29 Medellín, Colombia",
            link: "https://goo.gl/maps/Xzr8BZduPsqjDQa79"
        },
        phones: ["319 377 4860", "301 430 6064"],
        email: "hello@tangibledesign.co",
        social: SOCIAL_NETWORKS
    },
    menu:{
        title: "Menu",
        routes: ROUTES_FOOTER
    }
}