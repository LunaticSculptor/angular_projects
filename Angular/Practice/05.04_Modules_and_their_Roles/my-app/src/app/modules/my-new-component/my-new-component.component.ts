import { Component } from '@angular/core';

@Component({
  selector: 'app-my-new-component',
  standalone: false, // ✅ Explicitly set to false
  templateUrl: './my-new-component.component.html',
  styleUrls: ['./my-new-component.component.css']
})
export class MyNewComponentComponent { }
