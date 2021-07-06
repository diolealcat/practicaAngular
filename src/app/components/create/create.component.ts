import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project'; // ../ para salir del directorio create y ../ para salir del directorio components y despues ya se podra entrar al directorio de models
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {
  public title: string;
  public project: Project; 
  public save_project: any; // para el detalle del proyecto
  public status: string;
  public filesToUpload: Array<File>;  
  public url: string;

  constructor(
    private _projectService: ProjectService, 
    private _uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.url = Global.url;
    this.project = new Project("","","","", 0, "","");
    this.status = '';   
    this.filesToUpload = [];
   }

  ngOnInit(): void {
  } 

  onSubmit(form: any){
    
    //Guardar los datos
    this._projectService.saveProject(this.project).subscribe( // Se llama al metod addUser que se creo en el servicio peticiones
      response =>{
        if(response.project){        
          
          //Subir imagen   
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(Global.url+'upload-image/'+response.project._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              this.save_project = result.project; // para el detalle del projecto
              this.status = 'success';
              console.log(result);
              form.reset();
            });
            
          }else{
            this.save_project = response.project;
            this.status = 'success';
            form.reset();
          } 

        }else{
          this.status = 'failed';
        }        
      },
      error =>{
        console.log(<any>error);  
      }
    ); 
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files; // un array de tipo files y seleccionando el fileInput(que es loq ue captura el evento), target, files(que son todos los archivos que seleccionamos con el input. Y con esto ya se qtienen en la propiedad filesToUpload todos los archivos que queramos subir    
  }

}
