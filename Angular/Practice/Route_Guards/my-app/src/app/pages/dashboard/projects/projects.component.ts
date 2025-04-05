import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  projects = [
    {id: 1, name: 'Project 1'},
    {id: 2, name: 'Project 2'},
    {id: 3, name: 'Project 3'},
  ]
}
