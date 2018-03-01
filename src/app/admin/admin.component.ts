import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProjectService]
})
export class AdminComponent implements OnInit {

  constructor(private projectService: ProjectService) { }
  ngOnInit() {
  }

  submitForm(projectName: string, managerName: string, goal: number, productDescription: string, rewards: string, image: string) {
  var newProject: Project = new Project(projectName, managerName, goal, productDescription, rewards, image);
  this.projectService.addProjects(newProject);
  }

}
