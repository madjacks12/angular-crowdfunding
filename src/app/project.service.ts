import { Injectable } from '@angular/core';
import { Project } from './project.model';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
@Injectable()
export class ProjectService {
  projects: FirebaseListObservable<any[]>;
  constructor(private database: AngularFireDatabase) {
    this.projects = database.list('projects');
  }

  getProjects(){
    return this.projects;
  }

  addProjects(newProject: Project) {
    this.projects.push(newProject);
  }

  getProjectsById(projectId: string){
    return this.database.object('projects/' + projectId);
  }

  updateProject(localUpdatedProject){
    var projectEntryInFirebase = this.getProjectsById(localUpdatedProject.$key);
    projectEntryInFirebase.update({projectName: localUpdatedProject.projectName, managerName: localUpdatedProject.managerName, goal:localUpdatedProject.goal, productDescription: localUpdatedProject.productDescription, rewards: localUpdatedProject.rewards});
  }

  deleteProject(localProjectToDelete){
    var projectEntryInFirebase = this.getProjectsById(localProjectToDelete.$key);
    projectEntryInFirebase.remove();
  }
}
