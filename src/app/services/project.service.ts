import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Project } from '../models/project';
import { Global } from './global';

@Injectable()
export class ProjectService{
    public url: string;   

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url;        
    }

    testService(){
        return 'probando el servicio de Angular';
    }

    // PETICION AJAX USANDO POST
    saveProject(project: Project): Observable<any>{ // 1. parametro user(objeto para guardar)
        debugger;
        let params = JSON.stringify(project); // 2. para hacer una peticion ajax utilizando post a este servico tenemos que enviarle datos en un json string, creando una variable(params en este caso) y para convertir un objeto de javascript puro a un json string es decir a un strign que dentro tiene un json se debe usar el JSON.stringify() y dentro de uss parametros se le pasa lo que se convertira
        let headers = new HttpHeaders().set('Content-Type', 'application/json'); // 3. para indicar las cabeceras(es decir como se va a enviar la informacion) creamos una variable(headers) y hacemos un new HttpHeaders() que dicho metodo es el objeto que nos permite crear cabeceras y usamos el metodo set(para indicar el tipo de peticion que se ara) como primer parametro 'Content-Type'(el tipo de contenido) y como segundo parametro 'application/json'(el tipo)
        
        return this._http.post(this.url+'save-project', params, {headers: headers});// 4. parametros respectios (url, datosAGurdarEnElBackEnd, lasCabecerasConObjetoJsonDentroDeUnaPropiedadLamandaHeaders) 
        // 5. se sigue el ejemplo en el componente externo.component.ts y en su vista tambien        
    }

    getProjects():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'projects', {headers: headers});
    }

    getProject(id: any): Observable<any>{ // un id para buscar en la base de datos o pasarselo a la api y que busque el objeto con esa id
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.get(this.url+'project/'+id, {headers: headers});  // se le concatena la id que se recibira por parametro
    }

    deleteProject(id: any): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.delete(this.url+'project/'+id, {headers: headers});
    }

    updateProject(project: any): Observable<any>{ 
        debugger;
        let params = JSON.stringify(project);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this._http.put(this.url+'project/'+project._id, params, {headers: headers} );
        
    }
    
}