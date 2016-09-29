import {
    Component
} from '@angular/core';
import {
    SegmentacionService
} from './segmentacion.service';
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
    templateUrl: 'app/apps/segmentacion/segmentacion.component.html',
    providers: [SegmentacionService]
})
export class SegmentacionComponent {

    private departamento = new DepartamentoInterface();
    private provincia = new ProvinciaInterface();
    private distrito = new DistritoInterface();
    private area = new AreaInterface();
    private zona = new ZonaInterface();
    //private validLogin = this.loginservice.isValidSession();
    //private errorLogin = false;

    constructor(private segmentacionservice: SegmentacionService, private router: Router) {
        //if (this.validLogin) {
            this.router.navigate(['segmentacion'])
        //}
    }

    procesar() {
    
    }
}