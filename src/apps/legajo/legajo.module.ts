import {
  AfterViewInit, ElementRef, Component
} from '@angular/core';
import {
  NgModule
} from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import {
  CommonModule
} from '@angular/common';
import {
  LegajoService
} from './legajo.service';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';

import {
  ZonaInterface
} from './zona.interface';
import {
  ProvinciaInterface
} from './provincia.interface';
import {
  DistritoInterface
} from './distrito.interface';
import {
  DepartamentoInterface
} from './departamento.interface';

import {
  RegistroInterface
} from './registro.interface';

import {DomSanitizer} from "@angular/platform-browser";
@Component({
  templateUrl: 'legajo.html',
  providers: [LegajoService]
})

class Legajo {

  private ccdd: any;
  private ccpp: any;
  private ccdi: any;
  private zona: any;
  private verZona = false;
  private tabledata: boolean = false;
  private distrito: boolean = false;
  private registros: Object;
  private registro: RegistroInterface;
  private departamentos: DepartamentoInterface;
  private provincias: ProvinciaInterface;
  private distritos: DistritoInterface;
  private zonas: ZonaInterface;
  private tipo: number=0;
  
  constructor(private legajoservice: LegajoService, private elementRef: ElementRef, private domSanitizer: DomSanitizer) {
    this.cargarDepa()
    this.cargarTabla("0", "0", "0", "0", "0")
    this.registro = this.model
  }

  model = new RegistroInterface();

  cargarDepa() {
    this.legajoservice.getDepartamentos().subscribe(res => {
      this.departamentos = <DepartamentoInterface>res;
    })
  }

  cargarProvincias(ccdd: string, ccpp: string = "0") {
    this.ccdd = ccdd;
    this.distrito = false;
    this.verZona = false;
    if (this.ccdd != 0) {
      this.legajoservice.getProvincias(ccdd, ccpp).subscribe(res => {
        this.provincias = <ProvinciaInterface>res;
      })
      this.cargarTabla("1", ccdd, "0", "0", "0")
    } else {
      this.provincias = null;
      this.distritos = null;
      this.zonas = null;
      this.cargarTabla("0", "0", "0", "0", "0")
    }
  }

  cargarDistritos(ccpp: string) {
    this.ccpp = ccpp;
    this.distrito = false;
    this.verZona = false;
    if (this.ccpp != 0) {
      this.legajoservice.getDistritos(this.ccdd, ccpp, "0").subscribe(res => {
        this.distritos = <DistritoInterface>res;
      })
      this.cargarTabla("2", this.ccdd, ccpp, "0", "0")
    } else {
      this.distritos = null;
      this.zonas = null;
      this.cargarTabla("1", this.ccdd, "0", "0", "0")
    }
  }

  cargarZonas(ccdi: string) {
    this.ccdi = ccdi;
    this.verZona = false;
    let ubigeo = this.ccdd + this.ccpp + ccdi;
    this.distrito = true;
    if (this.ccdi != 0) {
      this.legajoservice.getZonas(ubigeo).subscribe(res => {
        this.zonas = <ZonaInterface>res;
      })
      this.cargarTabla("3", this.ccdd, this.ccpp, this.ccdi, "0")
    } else {
      this.zonas = null;
      this.distrito = false;
      this.cargarTabla("2", this.ccdd, this.ccpp, "0", "0")
    }
  }

  cargarAeu(zona: string) {
    this.verZona = true;
    this.zona = zona;
    if (zona != "0") {
      this.cargarTabla("4", this.ccdd, this.ccpp, this.ccdi, this.zona)
    } else {
      this.verZona = false;
      this.cargarTabla("3", this.ccdd, this.ccpp, this.ccdi, "0")
    }
  }

  cargarTabla(tipo: string, ccdd: string, ccpp: string, ccdi: string, zona: string) {
    this.legajoservice.getTabla(tipo, ccdd, ccpp, ccdi, zona).subscribe(res => {
      this.tabledata = true;
      this.registros = <RegistroInterface>res;
    })
  }

  capturaEvento(event,etiqueta) {
    if (event.key == "Enter") {
      if(this.verificarCodigo(etiqueta)){
        this.cargarTabla("0",this.ccdd,this.ccpp,this.ccdi,this.zona);
      }else{
        alert("CÓDIGO NO PERTENECE")
      }
    }
  }

  verificarCodigo(codigo): boolean {
    var valido: boolean=false
    if (this.tipo == 0) { //aeu
      
    } else {
      if (this.tipo == 1) { //seccion

      } else {
        if (this.tipo == 2) { //zona

        } else {
          if (this.tipo == 3) { //distrito
            
          }
        }
      }
    }
    return valido
  }
}

const routes: Routes = [{
  path: '',
  component: Legajo
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  declarations: [Legajo]
})
export default class LegajoModule { }