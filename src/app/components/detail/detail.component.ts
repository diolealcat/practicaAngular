import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { Global } from '../../services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass'],
  providers: [ProjectService]
})
export class DetailComponent implements OnInit {
  public url: string;
  public project: Project;

  constructor(
    private _projectService: ProjectService,
    private _router: Router,
    private _route: ActivatedRoute
    ) 
    {
      this.url = Global.url;
      this.project = new Project("","","","",0,"", "");
     }

  ngOnInit(): void {
    this._route.params.subscribe(params => { // Recogiendo el parametro que llega por la url
      let id = params.id; // recogera params.id que lega por la url y se guardara dentro de id  
    
      this.getProject(id);
     
    });
  }

  getProject(id: any){ // Llama al metodo del servicio getProject() con el cual realizaremos una peticion ajax al backend. Entonces este metodo recibira un id para despues pasarselo al metodo getProject() del dervicio, entonces se recogera el id por el url que llea
    this._projectService.getProject(id).subscribe(
      response =>{
        this.project = response.project;
      },
      error =>{
        console.log(<any>error);
      }
    );
  }

  deleteProject(id: any){
    this._projectService.deleteProject(id).subscribe(
      response => {
        if(response.project){
          this._router.navigate(['/proyectos']);
        }        
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
