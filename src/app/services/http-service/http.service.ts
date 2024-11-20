import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(public http: HttpClient) {}

    postApiCall<T>(endpoint: string, data: any, headers?: HttpHeaders) {
        return this.http.post<T>('http://localhost:3000' + endpoint, data, { headers });
    }
}