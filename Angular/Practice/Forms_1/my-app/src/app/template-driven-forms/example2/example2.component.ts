import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-example2',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './example2.component.html',
  styleUrl: './example2.component.css'
})
export class Example2Component {

  user = {
    name: '',
    email: '',
    password: '',
    age: null,
    gender: '',
    terms: false
  }
  onSubmit(form: NgForm){
    if(form.invalid){
      console.log('Invalid Form');
      alert('Invalid Form');
      return;
    }
    console.log(form.value);
  }
  onReset(form: NgForm) {
    form.reset();
  }
}
