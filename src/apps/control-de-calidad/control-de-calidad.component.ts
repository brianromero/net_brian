import {
    Component
} from '@angular/core';
import {
    ControldecalidadService
} from './control-de-calidad.service';
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
    templateUrl: 'app/apps/control-de-calidad/control-de-calidad.component.html',
    providers: [ControldecalidadService]
})
export class ControldecalidadComponent {

    private departamento = new DepartamentoInterface();
    private provincia = new ProvinciaInterface();
    private distrito = new DistritoInterface();
    private area = new AreaInterface();
    private zona = new ZonaInterface();
    //private validLogin = this.loginservice.isValidSession();
    //private errorLogin = false;

    constructor(private controldecalidadService: ControldecalidadService, private router: Router) {
        //if (this.validLogin) {
            this.router.navigate(['control-de-calidad'])
        //}
    }

    procesar() {
    
    }
}