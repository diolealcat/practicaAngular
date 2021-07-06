import { Component, OnInit } from '@angular/core';

import { Project } from '../../models/project'; // ../ para salir del directorio create y ../ para salir del directorio components y despues ya se podra entrar al directorio de models
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.sass'],
  providers: [ProjectService, UploadService],
})
export class EditComponent implements OnInit {
  public title: string;
  public project: Project;
  public save_project: any; // para el detalle del proyecto
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;

  constructor(
    private _projectService: ProjectService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title = 'Editar Proyecto';
    this.url = Global.url;
    this.project = new Project('', '', '', '', 0, '', '');
    this.status = '';
    this.filesToUpload = [];
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      // Recogiendo el parametro que llega por la url que en este caso es el id
      let id = params.id; // recogera params.id que lega por la url y se guardara dentro de id

      this.getProject(id); // se llama al metodo que llama al servicio el cual nos consigue el bojeto del proyecto y esto nos llena
    });
  }

  getProject(id: any) {
    // Llama al metodo del servicio getProject() con el cual realizaremos una peticion ajax al backend. Entonces este metodo recibira un id para despues pasarselo al metodo getProject() del dervicio, entonces se recogera el id por el url que llea
    this._projectService.getProject(id).subscribe(
      (response) => {
        this.project = response.project;
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  onSubmit(form: any) {
    
    this._projectService.updateProject(this.project).subscribe(
      (response) => {
        if (response.project) {
          // Subir la imagen
          if (this.filesToUpload) {
            this._uploadService
              .makeFileRequest(
                Global.url + 'upload-image/' + response.project._id,
                [],
                this.filesToUpload,
                'image'
              )
              .then((result: any) => {
                this.save_project = result.project;
                this.status = 'success';
              });
          } else {
            this.save_project = response.project;
            this.status = 'success';
          }
        } else {
          this.status = 'failed';
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );    
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
