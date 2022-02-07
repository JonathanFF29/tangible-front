import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { FileData } from 'src/app/models/shared.model';

const headers = new HttpHeaders({
    //'Content-Type': 'application/x-www-form-urlencoded'
});

@Injectable({
    providedIn: 'root'
})
export abstract class BaseService {
    private HttpUrl: Array<string> = environment.HttpUrl;
    private token: string;

    private headersWithToken = new HttpHeaders({
        //'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': ''
    });

    constructor(private http: HttpClient) { }

    public Get<Response>(url: string, root: number = 0, withToken: boolean = true): Observable<Response> {
        return this.http.get<Response>(this.Url(url, root), this.Headers(withToken));
    }

    public Post<Request, Response>(url: string, data: Request, root: number = 0, withToken: boolean = true): Observable<Response> {
        //const body = new HttpParams().set('data', JSON.stringify(data));
        return this.http.post<Response>(this.Url(url, root), data, this.Headers(withToken));
    }

    public PostFormData<Request, Response>(url: string, data: Request, root: number = 0, withToken: boolean = true): Observable<Response> {
        const formData = new FormData();

        for(let field in data){
            formData.append(field, String(data[field]));
        }

        return this.http.post<Response>(this.Url(url, root), formData, this.Headers(withToken));
    }

    /*public PostWithFile<Request, Response>(url: string, data: Request, file?: FileData, root: number = 0, withToken: boolean = true): Observable<Response> {
        const formData = new FormData();
        formData.append('data', JSON.stringify(data));
        if(file)
            formData.append(file.key, file.file);

        if(withToken)
            return this.http.post<Response>(this.Url(url, root), formData, this.HeaderWithFile());

        return this.http.post<Response>(this.Url(url, root), formData);
    }*/

    /*public PostWithFiles<Request, Response>(url: string, data: Request, files: Array<FileData>, root: number = 0, withToken: boolean = true): Observable<Response> {
        const formData = new FormData();

        formData.append('data', JSON.stringify(data));
        for (let file of files) {
            formData.append(file.key, file.file);
        }

        if(withToken)
            return this.http.post<Response>(this.Url(url, root), formData, this.HeaderWithFile());
        return this.http.post<Response>(this.Url(url, root), formData);
    }*/

    /*public getRootImages(): string {
        return environment.RootImages;
    }*/

    private Url(url: string, root: number): string {
        return this.HttpUrl[root] + url;
    }

    private GetToken() {
        if (!this.token) {
            this.token = sessionStorage.getItem('accessToken');
        }
        return this.token;
    }

    private Headers(token: boolean) {
        if (token) {
            let updatedHeaders = this.headersWithToken.set('x-access-token', this.GetToken());
            return { headers: updatedHeaders };
        }

        return { headers: headers };
    }

    private HeaderWithFile() {
        let headersWithFile = new HttpHeaders({
            'x-access-token': this.GetToken()
        })
        return { headers: headersWithFile };
    }

    public CleanToken() {
        this.token = null;
    }
}
