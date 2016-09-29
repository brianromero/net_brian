import {
    Http,
    Response
} from '@angular/http';

import {
    Observable
} from 'rxjs/Observable';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Helpers{
    public static extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    public static handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    public static logout(key: string = '') {
        localStorage.removeItem(key === '' ? 'usuario' : key)
        localStorage.removeItem('menu')
    }

    public static getJsonSession(key: string = '') {
        return JSON.parse(localStorage.getItem(key === '' ? 'usuario' : key))
    }

    public static isValidSession(key: string = ''): boolean {
        let sesion = localStorage.getItem(key === '' ? 'usuario' : key)
        return sesion == null ? false : true
    }
}