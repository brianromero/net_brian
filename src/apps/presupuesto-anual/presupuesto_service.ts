import {Helpers} from './../../app/helper';
import {Settings} from './../../app/app.settings';

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


@Injectable()
export class PresupuestoService {
    constructor(private http: Http) {}

    private actividadUrl: string = `${Settings.HOST_ROCIO()}pres_api/actividad/`;

    getActividades(): Observable<Object>{
        return this.http.get(this.actividadUrl).map(Helpers.extractData).catch(Helpers.handleError);
    }

}