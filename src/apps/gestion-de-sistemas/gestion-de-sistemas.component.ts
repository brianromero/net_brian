import {
    Component
} from '@angular/core';
import {
    GestionSistemasService
} from './service';
import {
    SistemasInterface
} from './sistemas.interface';

import {Helpers} from './../../app/helper';

@Component({
    templateUrl: 'gestion-de-sistemas.html',
    providers: [GestionSistemasService]
})

export class GestiondeSistemas {
    private sistemas_list: Object;
    private model_sistema = new SistemasInterface();
    private json_sesion = Helpers.getJsonSession();
    private usr_creacion = this.json_sesion[0].usuario;
    submitted = false;

    constructor(private sistemasservice: GestionSistemasService) {
        this.cargarSistemas();
    }

    onSubmit() {
        this.submitted = true;
    }

    cargarSistemas() {
        this.sistemasservice.getSistemas().subscribe(res => {
            this.sistemas_list = res;
        });
    }
    
    editorsave(){
        if(this.model_sistema.id_sistema===''){
            this.addSistema();    
        }else{
            this.editarSistema();
        }
    }

    addSistema() {
        this.model_sistema.usr_creacion = this.usr_creacion;
        this.sistemasservice.addSistema(this.model_sistema).subscribe(res => {
            console.log(res);
            this.cargarSistemas();
        });   
    }

    editarSistema() {
        this.model_sistema.usr_creacion = this.usr_creacion;
        this.sistemasservice.editSistema(this.model_sistema.id_sistema,this.model_sistema).subscribe(res => {
            console.log(res);
            this.cargarSistemas();
        });   
    }

    setModelData(id_sistema){
        this.sistemasservice.getSistemasDetail(id_sistema).subscribe(res => {
            this.model_sistema = <SistemasInterface>res
            console.log(this.model_sistema);
        })
    }

    emptyModel(){
        this.model_sistema.des_sist = ''
        this.model_sistema.flag_activo = ''
        this.model_sistema.id_sistema = ''
        this.model_sistema.nom_sist = ''
        this.model_sistema.usr_creacion = this.usr_creacion;
    }
    
}