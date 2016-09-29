import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  Layout
} from './layout.component';
import {
  RoutesService
} from './routes.service';
import {
  Http
} from '@angular/http';
import {
  Helpers
} from './../helper';

// noinspection TypeScriptValidateTypes
const routes: Routes = [{
  path: '',
  component: Layout,
  children: getRoutes()
}];

export const ROUTES = RouterModule.forChild(routes);

function getRoutes() {
  let http: Http;
  let routeservice = new RoutesService(http);
  let session = Helpers.getJsonSession();
  let results: Array < Object > = Array < Object > ();
  let validsession: boolean = Helpers.isValidSession();

  results.push({
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  });

  results.push({
    path: 'welcome',
    loadChildren: () => System.import('../dashboard/dashboard.module')
  })

  if(validsession){
    let modules: Array < string > = < Array < string >> session[0]['routes'];
        modules.map(module => results.push({
            path: module,
            loadChildren: () => System.import(`./../../apps/${module}/${module}.module`)
        }))
  }
  console.log(results)
  return results

}