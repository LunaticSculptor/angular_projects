import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-example1',
  imports: [FormsModule],
  templateUrl: './example1.component.html',
  styleUrl: './example1.component.css'
})
export class Example1Component {
  
  // username: string = '';

  user = {
    name: '',
    email: ''
  }

  onSubmit(form: NgForm) {
    // console.log('form data: ', this.user);
    if(form.invalid){
      console.log('Invalid Form');
      return;
    }
    console.log('form data: ', form.value);
    this.user.name='';
    this.user.email='';
  }
}
