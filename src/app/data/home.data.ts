import { CarouselPreview, HomeSections, BlogPreview, CategoryPreview, TeamMemberPreview } from '../models/home.model';
import { IMGS_HOME_CAROUSEL, IMG_HOME_WELCOME, IMG_HOME_ARCHITECTURE,
    IMG_HOME_REPRESENTATION, IMG_HOME_EXPERIENCE, IMG_HOME_LABORATORY, IMG_PREVIEW_BLOG_1, IMG_PREVIEW_BLOG_2, IMG_PREVIEW_BLOG_3, IMG_CATEGORY_SILLAS, IMG_CATEGORY_BAÑOS, IMG_CATEGORY_PLANTAS, IMG_CATEGORY_COCINAS, IMG_CATEGORY_ACCESORIOS, IMG_CATEGORY_MASETAS, IMG_MEMBER_ISIS, IMG_MEMBER_JUAN, IMG_MEMBER_CARLOS, IMG_MEMBER_LAURA, IMG_MEMBER_VICTOR, IMG_MEMBER_ANDRES, IMG_MEMBER_SANTIAGO } from './imagePaths.data';
import { ALL_ROUTES } from './routes.data';

export const CAROUSEL_PREVIEW: CarouselPreview = {
    imgsArray: IMGS_HOME_CAROUSEL,
    title: "Diseño de experiencias, Renders y Arquitectura",
    description: "Somos un estudio de diseño que crea experiencias híbridas entre lo físico y lo virtual"
}

export const HOMESECTIONS: HomeSections = {
    welcome: {
        title: "Diseño de experiencias, Renders y Arquitectura",
        description: "Somos un estudio de diseño que crea experiencias híbridas entro lo físico y lo virtual",
        backgroundURL: IMG_HOME_WELCOME,
        hasButton: false,
        textButton: "",
        pathButton: "",
        temporalLink: "" //luego quitar
    },
    architecture:{
        title: "Arquitectura y Diseño Interior",
        description: "Diseñamos y construimos casas, restaurantes, hoteles, oficinas, tiendas a tu estilo y tamaño",
        backgroundURL: IMG_HOME_ARCHITECTURE,
        hasButton: true,
        textButton: "Ver proyectos",
        pathButton: ALL_ROUTES.architecture.path,
        temporalLink: "https://www.youtube.com/watch?v=K6F4ghVx4SA" //luego quitar
    },
    representation:{
        title: "Diseño de Renders, Videos y Modelos 3D",
        description: "Y Tu \n ¿Cómo presentas tus proyectos, productos? \n La seducción digital!",
        backgroundURL: IMG_HOME_REPRESENTATION,
        hasButton: true,
        textButton: "Ver proyectos",
        pathButton: ALL_ROUTES.representation.path,
        temporalLink: "https://www.youtube.com/watch?v=zHfbHNqfZ2o" //luego quitar
    },
    experience: {
        title: "Tecnologías Inmersivas y Marketing Experiencial",
        description: "Transformación digital de empresas",
        backgroundURL: IMG_HOME_EXPERIENCE,
        hasButton: true,
        textButton: "Ver proyectos",
        pathButton: ALL_ROUTES.experienceDesign.path,
        temporalLink: "https://www.youtube.com/watch?v=pv04mpNoXQI" //luego quitar
    },
    laboratory: {
        title: "Laboratorio de Ideas y Aprendizaje",
        description: "Descarga cursos y aprende online",
        backgroundURL: IMG_HOME_LABORATORY,
        hasButton: true,
        textButton: "Ver más cursos",
        pathButton: ALL_ROUTES.laboratory.path,
        temporalLink: "https://bit.ly/Crehana-Arquitectura-3D-Vray" //luego quitar
    }
}

export const BLOGS_PREVIEW: Array<BlogPreview> = [
    {
        id: "1",
        imageURL: IMG_PREVIEW_BLOG_1
    },
    {
        id: "2",
        imageURL: IMG_PREVIEW_BLOG_2
    },
    {
        id: "3",
        imageURL: IMG_PREVIEW_BLOG_3
    }
]

export const CATEGORIES_PREVIEW: Array<CategoryPreview> = [
    {
        id: "1.1",
        imageURL: IMG_CATEGORY_SILLAS,
        name: "Sillas",
        backgroundColor: "#f4e4c4"
    },
    {
        id: "1.2",
        imageURL: IMG_CATEGORY_BAÑOS,
        name: "Baños",
        backgroundColor: "#b8d6b4"
    },
    {
        id: "1.3",
        imageURL: IMG_CATEGORY_PLANTAS,
        name: "Plantas",
        backgroundColor: "#78abc6"
    },
    {
        id: "1.4",
        imageURL: IMG_CATEGORY_COCINAS,
        name: "Cocinas",
        backgroundColor: "#c7cad1"
    },
    {
        id: "1.5",
        imageURL: IMG_CATEGORY_ACCESORIOS,
        name: "Accesorios",
        backgroundColor: "#f3d8e1"
    },
    {
        id: "1.6", 
        imageURL: IMG_CATEGORY_MASETAS,
        name: "Masetas",
        backgroundColor: "#c3bee6"
    }
]


export const TEAM_PREVIEW: Array<TeamMemberPreview> =[
    {
        imageURL: IMG_MEMBER_JUAN, 
        name: "Juan",
        rol: "CEO, Diseñador de experiencias"
    },
    {
        imageURL: IMG_MEMBER_CARLOS, 
        name: "Carlos",
        rol: "CEO, Director de diseño"
    },{
        imageURL: IMG_MEMBER_LAURA, 
        name: "Laura",
        rol: "Diseñadora de espacios"
    },{
        imageURL: IMG_MEMBER_ISIS, 
        name: "Isis",
        rol: "Arquitecta"
    },
    {
        imageURL: IMG_MEMBER_VICTOR, 
        name: "Victor",
        rol: "Artista 3D"
    },
    {
        imageURL: IMG_MEMBER_ANDRES, 
        name: "Andrés",
        rol: "Artista 3D"
    },
    {
        imageURL: IMG_MEMBER_SANTIAGO, 
        name: "Santiago",
        rol: "Desarrollador"
    }
]