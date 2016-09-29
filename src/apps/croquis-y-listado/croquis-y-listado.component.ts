import {
    Component
} from '@angular/core';
import {
    CroquisylistadoService
} from './croquis-y-listado.service';
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
    templateUrl: 'app/apps/croquis-y-listado/croquis-y-listado.component.html',
    providers: [CroquisylistadoService]
})
export class CroquisylistadoComponent {

    private departamento = new DepartamentoInterface();
    private provincia = new ProvinciaInterface();
    private distrito = new DistritoInterface();
    private area = new AreaInterface();
    private zona = new ZonaInterface();
    //private validLogin = this.loginservice.isValidSession();
    //private errorLogin = false;

    constructor(private croquisylistadoservice: CroquisylistadoService, private router: Router) {
        //if (this.validLogin) {
            this.router.navigate(['croquisylistado'])
        //}
    }
}