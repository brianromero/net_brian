import {
  Injectable
} from '@angular/core';
import {
  Http,
  Response
} from '@angular/http';
import {
  Headers,
  RequestOptions
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
import {Helpers} from './../helper';
import {Settings} from './../app.settings';

@Injectable()
export class RoutesService {
  constructor(private http: Http) {}

  private routesUrl = `${Settings.HOST()}api/routes/`;
 
  getRoutes(query:string): Observable < Object > {
    return this.http.get(this.routesUrl+query)
      .map(Helpers.extractData)
      .catch(Helpers.handleError)
  }

}