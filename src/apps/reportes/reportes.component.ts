import {
    Component
} from '@angular/core';
import {
    ReportesService
} from './reportes.service';
import {
    Router
} from '@angular/router';
import {
    DepartamentoInterface
} from './departamento.interface'
import {
    ProvinciaInterface
} 
from './provincia.interface'
import {
    DistritoInterface
} 
from './distrito.interface'
import {
    AreaInterface
} from './area.interface'
import {
    ZonaInterface
} from './zona.interface'

@Component({
    selector: 'my-app',
    templateUrl: 'app/apps/reportes/reportes.component.html',
    providers: [ReportesService]
})
export class ReportesService {

    private departamento = new DepartamentoInterface();
    private provincia = new ProvinciaInterface();
    private distrito = new DistritoInterface();
    private area = new AreaInterface();
    private zona = new ZonaInterface();
    //private validLogin = this.loginservice.isValidSession();
    //private errorLogin = false;

    constructor(private reportesservice: ReportesService, private router: Router) {
        //if (this.validLogin) {
            this.router.navigate(['reportes'])
        //}
    }
}