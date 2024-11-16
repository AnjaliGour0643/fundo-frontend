import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(public http: HttpClient) {}

    loginApiCall(endpoint: string, data: any){
        return this.http.post('http://localhost:3000' + endpoint, data)
    }
}