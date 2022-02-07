export interface Social{
    title: string;
    icon: string;
    link: string;
}

export class FileData{
    key: string;
    file: File;

    constructor(key: string, file: File){
        this.key = key;
        this.file = file;
    }
}

export interface DefaultResponse{
    message: string;
}

export interface ErrorResponse{
    code: string;
    errno: number;
    sqlMessage: string;
    sqlState: string;
    index: number;
    sql: string;
}

