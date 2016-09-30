import {
    Http,
    Response
} from '@angular/http';

import {
    Observable
} from 'rxjs/Observable';
// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

export class Helpers {
    public static extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    public static handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

    public static logout(key: string = '') {
        localStorage.removeItem(key === '' ? 'usuario' : key)
        localStorage.removeItem('menu')
    }

    public static getJsonSession(key: string = '') {
        return JSON.parse(localStorage.getItem(key === '' ? 'usuario' : key))
    }

    public static isValidSession(key: string = ''): boolean {
        let sesion = localStorage.getItem(key === '' ? 'usuario' : key)
        return sesion == null ? false : true
    }
    
    public static descargarSegExcel() {
        //Creamos un Elemento Temporal en forma de enlace
        var tmpElemento = document.createElement('a');
        // obtenemos la información desde el div que lo contiene en el html
        // Obtenemos la información de la tabla
        var data_type = 'data:application/vnd.ms-excel';
        var tabla_div = document.getElementById('tablaSeg');
        var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
        tmpElemento.href = data_type + ', ' + tabla_html;
        //Asignamos el nombre a nuestro EXCEL
        tmpElemento.download = 'SEGMENTACION.xls';
        // Simulamos el click al elemento creado para descargarlo
        tmpElemento.click();
    }
    
    public static descargarCroExcel() {
        var tmpElemento = document.createElement('a');
        var data_type = 'data:application/vnd.ms-excel';
        var tabla_div = document.getElementById('tablaCro');
        var tabla_html = tabla_div.outerHTML.replace(/ /g, '%20');
        tmpElemento.href = data_type + ', ' + tabla_html;
        tmpElemento.download = 'CROQUIS_Y_LISTADO.xls';
        tmpElemento.click();
    }

    public static descargarZip(){
        var zip = new JSZip();
        zip.file("Hello.txt", "Hello World\n");
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, {base64: true});
        zip.generateAsync({type:"blob"})
        .then(function(content) {
            // see FileSaver.js
            saveAs(content, "example.zip");
        });
    }
}