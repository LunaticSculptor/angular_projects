import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { DisplayComponentComponent } from './display-component/display-component.component';
import { InputComponentComponent } from './input-component/input-component.component';

@Component({
  selector: 'app-root',
  imports: [DisplayComponentComponent, InputComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';
}
