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
export class GestionProyectosService {
    constructor(private http: Http) {}
    private proyectos_url: string = `${Settings.HOST()}api/v1/proyectos/`;
    private proyectossiga_url: string = `${Settings.HOST()}proyectos_siga/`;

    getProyectos_list(): Observable < Object > {
        return this.http.get(this.proyectos_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }
    getProyectos_detail(pk): Observable < Object > {
        return this.http.get(this.proyectos_url + pk)
            .map(Helpers.extractData)
            .catch(Helpers.handleError)
    }

    getProyectosSiga(): Observable < Object >{
        return this.http.get(this.proyectossiga_url)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    getProyectosSigaDetail(idproyecto): Observable < Object >{
        return this.http.get(this.proyectossiga_url+idproyecto)
            .map(Helpers.extractData)
            .catch(Helpers.handleError);
    }

    addProyecto(data):Observable<Object>{
        let body = JSON.stringify(data);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.proyectos_url, body, options)
                    .map(Helpers.extractData)
                    .catch(Helpers.handleError);
    }
}