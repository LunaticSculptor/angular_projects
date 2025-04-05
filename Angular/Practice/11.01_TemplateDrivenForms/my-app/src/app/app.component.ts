import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  user = {
    username: '',
    email: ''
  };
  // onSubmit(form: any) {
  //   if (form.valid) {
  //     console.log('Form Value:', form.value);
  //     // Perform the submission logic, e.g., sending data to a server
  //   }
  // }
  onSubmit(formValue: any) {
    console.log(formValue.value);
  }
}
