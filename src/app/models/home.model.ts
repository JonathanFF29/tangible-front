export interface CarouselPreview {
    imgsArray: string[],
    title: string,
    description: string
}

export interface HomeSections{
    welcome: HomeSection;
    architecture: HomeSection;
    representation: HomeSection;
    experience: HomeSection;
    laboratory: HomeSection;
}

export interface HomeSection{
    title: string;
    description: string;
    backgroundURL: string;
    hasButton: boolean;
    textButton: string;
    pathButton: string;
    temporalLink: string; //se hace para linkear a un video temporalmente en el home, luego quitar y llevar al pathButton
}

export interface BlogPreview{
    id: string;
    imageURL: string;
}

export interface CategoryPreview{
    id: string;
    imageURL: string;
    name: string;
    backgroundColor: string;
}

export interface TeamMemberPreview{
    imageURL: string;
    name: string;
    rol: string;
}
