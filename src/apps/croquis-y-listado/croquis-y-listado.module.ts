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
  CroquisylistadoService
} from './croquis-y-listado.service';
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
import {Helpers} from './../../app/helper';
import {
  RegistroInterface
} from './registro.interface';
import 'jszip';
import {DomSanitizer} from "@angular/platform-browser";
import {DataTableModule,SharedModule,ButtonModule} from 'primeng/primeng';


declare var jQuery;


@Component({
  templateUrl: 'croquis-y-listado.html',
  styles:[`.intro { 
    background-color: #A9E2F3;
  }`],
  providers: [CroquisylistadoService]
})

class Croquisylistado {

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
  

  private urlSeccion:any="http://172.16.2.205:8000/descargarPdf/021806/00100/1/";
  private urlEmpadronador:any="http://172.16.2.205:8000/descargarPdf/021806/00100/2/";
  
  constructor(private croquisylistado: CroquisylistadoService, private elementRef: ElementRef, private domSanitizer: DomSanitizer) {
    this.cargarDepa()
    this.cargarTabla("0", "0", "0", "0", "0")
    this.registro = this.model
  }

  model = new RegistroInterface();

  cargarDepa() {
    this.croquisylistado.getDepartamentos().subscribe(res => {
      this.departamentos = <DepartamentoInterface>res;
    })
  }

  cargarProvincias(ccdd: string, ccpp: string = "0") {
    this.ccdd = ccdd;
    this.distrito = false;
    this.verZona = false;
    if (this.ccdd != 0) {
      this.croquisylistado.getProvincias(ccdd, ccpp).subscribe(res => {
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
      this.croquisylistado.getDistritos(this.ccdd, ccpp, "0").subscribe(res => {
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
      this.croquisylistado.getZonas(ubigeo).subscribe(res => {
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
    this.getRuta()
  }

  cargarTabla(tipo: string, ccdd: string, ccpp: string, ccdi: string, zona: string) {
    this.croquisylistado.getTabla(tipo, ccdd, ccpp, ccdi, zona).subscribe(res => {
      this.tabledata = true;
      this.registros = <RegistroInterface>res;
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
    this.croquisylistado.getRegistro(this.url).subscribe((data) => {
      this.registros2 = <RegistroInterface>data;
    })       
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
    alert("PROCESANDO GENERACION DE CROQUIS Y LISTADO: " + this.urlProcesar)
  }

  descargarZip(tipo) {
    this.croquisylistado.getZip(this.ccdd, this.ccpp, this.ccdi,this.zona,tipo).subscribe(res => {
        res;
    })
  }

}

const routes: Routes = [{
  path: '',
  component: Croquisylistado
}];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, DataTableModule,SharedModule,ButtonModule],
  declarations: [Croquisylistado]
})
export default class CroquisylistadoModule { }
