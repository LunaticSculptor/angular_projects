import { Component } from '@angular/core';
import { Example2Component } from '../../template-driven-forms/example2/example2.component';
import { Example1Component } from '../../template-driven-forms/example1/example1.component';
import { ReactiveExample1Component } from '../../reactive-forms/reactive-example1/reactive-example1.component';
import { ReactiveExample2Component } from '../../reactive-forms/reactive-example2/reactive-example2.component';

@Component({
  selector: 'app-home',
  imports: [
    // Example1Component,
    // Example2Component,
    // ReactiveExample1Component
    ReactiveExample2Component
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
