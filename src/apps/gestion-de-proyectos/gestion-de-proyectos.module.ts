import {
  Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';
import {
  Router,
  Routes,
  RouterModule
} from '@angular/router';
import {
  FormsModule
} from '@angular/forms';
import {
  GestionProyectosService
} from './service';
import {
  TableOptions,
  TableColumn,
  ColumnMode
} from 'angular2-data-table';
import {
  Angular2DataTableModule
} from 'angular2-data-table';
import { ProyectosSeguridad } from './proyectos_seguridad.interface';
import { ProyectosSiga } from './proyectos_siga.interface';



@Component({
  templateUrl: 'gestion-de-proyectos.html',
  providers: [GestionProyectosService]
})

class GestiondeProyectos {
  private response: Object;
  private proyectos_seguridad: Object;
  private proyecto_seguridad_post=new ProyectosSeguridad();
  private proyectossiga: Object;
  private ifhay: boolean = false;
  private proyectosdetail: ProyectosSiga;

  constructor(private router: Router, private proyectosservice: GestionProyectosService) {
    this.cargarProyectosSiga();
    this.cargarProyectosSeguridad();
  }

  cargarProyectosSeguridad() {
    this.proyectosservice.getProyectos_list().subscribe(res => {
      this.proyectos_seguridad = res;
    });
  }

  cargarProyectosSiga() {
    this.proyectosservice.getProyectosSiga().subscribe(res => {
      this.proyectossiga = res;
    });
  }
  cargarProyectosSigaDetail(idproyecto) {
    if (idproyecto == '0') {
      this.ifhay = false;
    } else {
      this.proyectosservice.getProyectosSigaDetail(idproyecto).subscribe(res => {
        this.ifhay = true;
        this.proyectosdetail = <ProyectosSiga>res;
      });
    }
  }

  addProyectosSigatoSeguridad() {
    console.log(this.proyecto_seguridad_post);
    console.log(this.proyectosdetail);
    this.proyecto_seguridad_post.anio_proy=this.proyectosdetail.annio_meta;
    this.proyecto_seguridad_post.des_proy=this.proyectosdetail.desc_proyecto;
    this.proyectosservice.addProyecto(this.proyecto_seguridad_post).subscribe(res => {
      console.log(res);
      this.cargarProyectosSeguridad();
    })
  }
}

const routes: Routes = [{
  path: '',
  component: GestiondeProyectos
}];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, Angular2DataTableModule],
  declarations: [GestiondeProyectos]
})
export default class GestiondeProyectosModule {}