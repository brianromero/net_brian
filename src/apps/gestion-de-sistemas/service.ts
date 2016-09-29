import {
    Injectable
} from '@angular/core';
import {
    Http,
    Response
} from '@angular/http';
import {
    Headers,
    RequestOptions,
    RequestMethod,
    Request
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

import {
    Settings
} from './../../app/app.settings';
import {Helpers} from './../../app/helper';

@Injectable()
export class GestionSistemasService {
    constructor(private http: Http) {}
    private sistemas_url: string = `${Settings.HOST()}api/v1/sistemas/`;

    getSistemas(): Observable < Object > {
        return this.http.get(this.sistemas_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    getSistemasDetail(pk): Observable < Object >{
        return this.http.get(this.sistemas_url + pk)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    addSistema(data):Observable<Object>{
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.sistemas_url, body, options)
                    .map(Helpers.extractData)
                    .catch(Helpers.handleError);
    }
    editSistema(pk,data):Observable<Object>{
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.put(this.sistemas_url+pk+'/', body, options)
                    .map(Helpers.extractData)
                    .catch(Helpers.handleError);
    }
}