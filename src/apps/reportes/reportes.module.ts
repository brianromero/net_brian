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
import 'jszip';
import {DomSanitizer} from "@angular/platform-browser";

declare var jQuery;


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
  private tipo: string='';
    

  private datareporte01: Reporte01Interface;  
  private datareporte02: Reporte02Interface;

  private urlSeccion:any="http://172.16.2.205:8000/descargarPdf/021806/00100/1/";
  private urlEmpadronador:any="http://172.16.2.205:8000/descargarPdf/021806/00100/2/";
  
  constructor(private reportes: ReportesService, private elementRef: ElementRef, private domSanitizer: DomSanitizer) {
    this.cargarDepa()
    //this.cargarTabla("0", "0", "0", "0", "0")
    this.registro = this.model
  }

  model = new RegistroInterface();

  cargarDepa() {
    this.reportes.getDepartamentos().subscribe(res => {
      this.departamentos = <DepartamentoInterface>res;
    })
  }

  cargarProvincias(ccdd: string, ccpp: string = "0") {
    this.datareporte01=null;
    this.ccdd = ccdd;
    this.distrito = false;
    this.verZona = false;
    console.log(this.distrito)
    if (this.ccdd != 0) {
      this.reportes.getProvincias(ccdd, ccpp).subscribe(res => {
        this.provincias = <ProvinciaInterface>res;
      })
      //this.cargarTabla("1", ccdd, "0", "0", "0")
    } else {
      this.provincias = null;
      this.distritos = null;
      this.zonas = null;
      //this.cargarTabla("0", "0", "0", "0", "0")
    }
  }

  cargarDistritos(ccpp: string) {
    this.datareporte01=null;
    this.ccpp = ccpp;
    this.distrito = false;
    this.verZona = false;
    console.log(this.ccpp)
    if (this.ccpp != 0) {
      this.reportes.getDistritos(this.ccdd, ccpp, "0").subscribe(res => {
        this.distritos = <DistritoInterface>res;
      })
      //this.cargarTabla("2", this.ccdd, ccpp, "0", "0")
    } else {
      this.distritos = null;
      this.zonas = null;
      //this.cargarTabla("1", this.ccdd, "0", "0", "0")
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
      //this.cargarTabla("3", this.ccdd, this.ccpp, this.ccdi, "0")
    } else {
      this.zonas = null;
      this.distrito = false;
      //this.cargarTabla("2", this.ccdd, this.ccpp, "0", "0")
    }
  }

  cargarAeu(zona: string) {
    this.verZona = true;
    this.zona = zona;
    if (zona != "0") {
      //this.cargarTabla("4", this.ccdd, this.ccpp, this.ccdi, this.zona)
    } else {
      this.verZona = false;
      //this.cargarTabla("3", this.ccdd, this.ccpp, this.ccdi, "0")
    }
    //this.getRuta()
  }

  cargarTabla(ccdi: string) {
    this.ccdi=ccdi;
    if(this.reporte01){
      this.tipo='0';
    }
    if(this.reporte02){
      this.tipo='1';
    }
    console.log(this.tipo);
    this.reportes.getTabla(this.tipo, this.ccdd, this.ccpp, this.ccdi).subscribe(res => {
      this.tabledata = true;
      if(this.reporte01){
        this.datareporte01 = <Reporte01Interface>res;
      }
      if(this.reporte02){
        this.datareporte02 = <Reporte02Interface>res;
      }
    })
  }

  getRegistro(tipo_cro) {    
    this.tipo_cro = tipo_cro;
    if (this.tipo_cro == 0) {
      this.seccionAux = false;
      this.aeuAux = false;
      this.getRuta();
    }
    if (this.tipo_cro == 1) {
      this.seccionAux = true;
      this.aeuAux = false;
      this.cambiarPdfSeccion(1);
    }
    if (this.tipo_cro == 2) {
      this.seccionAux = true;
      this.aeuAux = true;
      this.cambiarPdfAeu(1, 1);
    }
    this.url = this.tipo_cro + '/' + this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.zona + '/';           
  }

  getRuta() {
    let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + this.zona;
    let ubigeo = this.ccdd + this.ccpp + this.ccdi;
    this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/${urlCroquisAux}.pdf`);
    this.urlSeccion = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://172.16.2.205:8000/descargarPdf/${ubigeo}/${this.zona}/1/`);
    this.urlEmpadronador = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://172.16.2.205:8000/descargarPdf/${ubigeo}/${this.zona}/2/`);
  }

  cambiarPdfSeccion(seccion) {
    this.seccion = seccion;
    let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + this.zona + ('00' + this.seccion).slice(-3);
    this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/${urlCroquisAux}.pdf`);
    jQuery('#tablaCroAux tr').click(function () {
        jQuery('#tablaCroAux tr').each(function(){
          jQuery(this).removeClass('intro')
        })
        jQuery(this).addClass('intro');
    });
  }

  cambiarPdfAeu(seccion, aeu) {
    this.seccion = seccion;
    this.aeu = aeu;
    let urlCroquisAux = this.ccdd + this.ccpp + this.ccdi + this.zona + ('00' + this.seccion).slice(-3) + this.aeu;
    this.urlCroquis = this.domSanitizer.bypassSecurityTrustResourceUrl(`http://192.168.221.123/desarrollo/${urlCroquisAux}.pdf`);
    jQuery('#tablaCroAux tr').click(function () {
        jQuery('#tablaCroAux tr').each(function(){
          jQuery(this).removeClass('intro')
        })
        jQuery(this).addClass('intro');
    });
  }

  descargarExcel(id, nom) {
    Helpers.descargarExcel(id, nom);
  }

  procesarCro() {
    this.urlProcesar = '';
    if (this.zona != '0') {
      this.urlProcesar = this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/' + this.zona + '/';
    } else {
      this.urlProcesar = this.ccdd + '/' + this.ccpp + '/' + this.ccdi + '/0/';
    }
  }

  elegirReporte(reporte){
    if(reporte=="0"){
      this.reporte01=true;
      this.reporte02=false;
    }
    if(reporte=="1"){
      this.reporte02=true;
      this.reporte01=false;
      console.log(reporte);
    }
    this.departamentos = null;
    this.provincias = null;
    this.distritos = null;
    this.datareporte01=null;
    this.datareporte02=null;
    this.cargarDepa();
  }

}

const routes: Routes = [{
  path: '',
  component: Reportes
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  declarations: [Reportes]
})
export default class ReportesModule { }
