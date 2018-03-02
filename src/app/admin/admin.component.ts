import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ProjectService]
})
export class AdminComponent implements OnInit {

  constructor(private projectService: ProjectService, private db: AngularFireDatabase) { }
  ngOnInit() {
  }


  featuredPhotoSelected(event: any) {
    const file: File = event.target.files[0];

    const metaData = {'contentType': file.type};
    let name = file.name;
    const storageRef: firebase.storage.Reference = firebase.storage().ref('/photos/' + name)
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      firebase.database().ref('/photos/urls/').push(uploadSnapshot.downloadURL);
    })
   }


  submitForm(projectName: string, managerName: string, goal: number, productDescription: string, rewards: string) {
    var newProject: Project = new Project(projectName, managerName, goal, productDescription, rewards);
    this.projectService.addProjects(newProject);
  }
}
