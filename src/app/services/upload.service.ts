import { Injectable } from '@angular/core';
import { Global } from './global'; // ./ direcorio actual

@Injectable()
export class UploadService{
    public url: string;

    constructor(){
        this.url = Global.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string){ // metodo que ara una peticion ajax clasica pero en la cual  vamos a juntar un archivo para subir
        return new Promise(function(resolve, reject){ // resolve =que la promesa se ha resuelto - reject = nos e ha resuelto
            var formData:any = new FormData(); // definiendo la peticion ajax para subir archivos, para esto se debe simular un formulario clasico creando una variable en este caso llamada formData, despues creando un Nuevo objeto FormData(este objeto eprmitira permitira una especie de formulario en un objeto)
            var xhr = new XMLHttpRequest();// xhr s= seria un sinonimo de ajax en este caso - XMLHttpRequest() es el tipico objeto de peticiones asincronas que siempre ha habido en javascript
            
            for(var i = 0; i < files.length; i++){ // recorrera todos los ficheros que vallan llegando
                formData.append(name, files[i], files[i].name); // formData.append = se adjuntaran los ficheros en el formulario sus parametros de referencia (nombreQuellegaPorParametro, ficheros[recorriendoCadaUno], files[recorriendoCadaUno].conElNombre) 
            }
            // peticion ajax
            xhr.onreadystatechange = function(){ // onreadystatechange= cuando aiga algun cambio
                if(xhr.readyState == 4){ // 
                    if(xhr.status == 200){ // si la peticion es correcta
                        resolve(JSON.parse(xhr.response)); // resolve = para envair la respuesta por parametro tranformando xhr.response a un json
                    }else{
                        reject(xhr.response); // reject envia por parametro en caso de que falle 
                    }
                }
            }
            xhr.open('POST', url, true); // la peticion por (post, urlQueSeLeIndique, TrueParaQueHagaLaPEticion) 
            xhr.send(formData); // con el metodo send envia el formulario con formData
        });
    }

}
