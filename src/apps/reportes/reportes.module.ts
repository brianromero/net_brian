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
  ReportesService
} from './reportes.service';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms';
import {
  Reporte01Interface
} from './reporte01.interface';
import {
  Reporte02Interface
} from './reporte02.interface';
import {
  Reporte03Interface
} from './reporte03.interface';
import {
  Reporte04Interface
} from './reporte04.interface';
import {
  Reporte05Interface
} from './reporte05.interface';
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
import {Helpers} from './../../app/helper';
import {
  RegistroInterface
} from './registro.interface';
import {DomSanitizer} from "@angular/platform-browser";
import {DataTableModule,SharedModule,ButtonModule} from 'primeng/primeng';



@Component({
  templateUrl: 'reportes.html',
  styles:[`.intro { 
    background-color: #A9E2F3;
}`],
  providers: [ReportesService]
})

class Reportes {

  private ccdd: any;
  private ccpp: any;
  private ccdi: any;
  private zona: any = 0;
  private seccion: any = 0;
  private aeu: any = 0;
  private verZona = false;
  private url: string = '';
  private urlCroquis: any;
  private urlProcesar: any;
  private tipo_cro: number = 0;
  private tabledata: boolean = false;
  private seccionAux: boolean = false;
  private aeuAux: boolean = false;
  private distrito: boolean = false;
  private descarga: Object;
  private registros: Object;
  private registros2: Object;
  private registro: RegistroInterface;
  private departamentos: DepartamentoInterface;
  private provincias: ProvinciaInterface;
  private distritos: DistritoInterface;
  private zonas: ZonaInterface;
  private thisAux: any;
  
  private reporte01: boolean=true;
  private reporte02: boolean=false;
  private reporte03: boolean=false;
  private reporte04: boolean=false;
  private reporte05: boolean=false;
  
  private tipo: string='';    

  private datareporte01: Reporte01Interface;  
  private datareporte02: Reporte02Interface;
  private datareporte03: Reporte03Interface;
  private datareporte04: Reporte04Interface;
  private datareporte05: Reporte05Interface;

  constructor(private reportes: ReportesService, private elementRef: ElementRef, private domSanitizer: DomSanitizer) {
    this.cargarDepa()
    this.registro = this.model
  }

  model = new RegistroInterface();

  cargarDepa() {
    this.reportes.getDepartamentos().subscribe(res => {
      this.departamentos = <DepartamentoInterface>res;
    })
  }

  cargarProvincias(ccdd: string, ccpp: string = "0") {
    this.ccdd = ccdd;
    this.distrito = false;
    this.verZona = false;    
    this.datareporte01=null;
    this.datareporte02=null;
    this.datareporte03=null;
    this.datareporte04=null;
    this.datareporte05=null;
    if (this.ccdd != 0) {
        this.reportes.getProvincias(ccdd, ccpp).subscribe(res => {
        this.provincias = <ProvinciaInterface>res;
      })
    } else {
      this.provincias = null;
      this.distritos = null;
      this.zonas = null;      
    }
  }

  cargarDistritos(ccpp: string) {
    this.ccpp = ccpp;
    this.distrito = false;
    this.verZona = false;
    this.datareporte01=null;
    this.datareporte02=null;
    this.datareporte03=null;
    this.datareporte04=null;
    this.datareporte05=null;
    if (this.ccpp != 0) {
      this.reportes.getDistritos(this.ccdd, ccpp, "0").subscribe(res => {
        this.distritos = <DistritoInterface>res;
      })
    } else {
      this.distritos = null;
      this.zonas = null;
    }
  }

  cargarZonas(ccdi: string) {
    this.ccdi = ccdi;
    this.verZona = false;
    let ubigeo = this.ccdd + this.ccpp + ccdi;
    this.distrito = true;
    if (this.ccdi != 0) {
      this.reportes.getZonas(ubigeo).subscribe(res => {
        this.zonas = <ZonaInterface>res;
      })
    } else {
      this.zonas = null;
      this.distrito = false;
    }
  }

  cargarTabla(ccdi: string) {
    this.ccdi=ccdi;
    if(this.reporte01){
      this.tipo='0';
    }
    if(this.reporte02){
      this.tipo='1';
    }
    if(this.reporte03){
      this.tipo='2';
    }
    this.reportes.getTabla(this.tipo, this.ccdd, this.ccpp, this.ccdi).subscribe(res => {
      this.tabledata = true;
      if(this.reporte01){
        this.datareporte01 = <Reporte01Interface>res;
      }
      if(this.reporte02){
        this.datareporte02 = <Reporte02Interface>res;
      }
      if(this.reporte03){
        this.datareporte03 = <Reporte03Interface>res;
      }
      if(this.reporte04){
        this.datareporte04 = <Reporte04Interface>res;
      }
      if(this.reporte05){
        this.datareporte05 = <Reporte05Interface>res;
      }
    })
  }

  descargarExcel(id, nom) {
    Helpers.descargarExcel(id, nom);
  }

  elegirReporte(reporte){
    if(reporte=="0"){
      this.reporte01=true;
      this.reporte02=false;
      this.reporte03=false;
      this.reporte04=false;
      this.reporte05=false;
    }
    if(reporte=="1"){
      this.reporte01=false;
      this.reporte02=true;
      this.reporte03=false;
      this.reporte04=false;
      this.reporte05=false;
    }
    if(reporte=="2"){
      this.reporte01=false;
      this.reporte02=false;
      this.reporte03=true;
      this.reporte04=false;
      this.reporte05=false;
    }
    if(reporte=="3"){
      this.reporte01=false;
      this.reporte02=false;
      this.reporte03=false;
      this.reporte04=true;
      this.reporte05=false;
    }
    if(reporte=="4"){
      this.reporte01=false;
      this.reporte02=false;
      this.reporte03=false;
      this.reporte04=false;
      this.reporte05=true;
    }
    this.cargarTabla(this.ccdi);
  }

}

const routes: Routes = [{
  path: '',
  component: Reportes
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule,DataTableModule,SharedModule,ButtonModule],
  declarations: [Reportes]
})
export default class ReportesModule { }
