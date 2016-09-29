import { Injectable } from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import {
    Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {Settings} from './../app.settings';
import {Helpers} from './../helper';

@Injectable()
export class LoginService {
    constructor(private http: Http) {}

    private loginUrl: string = `${Settings.HOST()}authentication/login/`;
    private auth;

    authenticate(queryparameters:string): Observable < Object > {
        let _body = queryparameters;
        return this.http.get(this.loginUrl+_body).map(Helpers.extractData).catch(Helpers.handleError)
    }
}