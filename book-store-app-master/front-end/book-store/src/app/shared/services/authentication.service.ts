import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global, User } from '../../imports';

@Injectable()
export class AuthenticationService {

    //----------------PROPERTIRS-------------------

    basicURL: string = Global.Host + '/api';

    //----------------CONSTRUCTOR------------------

    constructor(private httpClient: HttpClient) { }

    //----------------METHODS-------------------

    login(userName: string, password: string): Observable<any> {
        let url: string = `${this.basicURL}/login`;
        let data = { userName: userName, password: password };
        return this.httpClient.post(url, data);
    }

    register(user: User): Observable<any> {
        let url: string = `${this.basicURL}/register`;
        return this.httpClient.post(url, user);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem(Global.CurrentUser);
    }
    upload(image: any): Observable<any> {
        let url: string = `${this.basicURL}/upload`;
        let formData: FormData = new FormData();
        formData.append('file', image, image.name);
        return this.httpClient.post(url, formData);
    }
}