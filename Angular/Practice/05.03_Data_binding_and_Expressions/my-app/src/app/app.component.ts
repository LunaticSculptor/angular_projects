import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormsModule } from '@angular/forms';  // For Hello Dynamic: FormsModule
import { ReactiveFormsModule } from '@angular/forms'; // For Input

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  // Data binding: Interpolation/ One Way binding
  title = 'my-app';
  user = {
    name: 'John',
    age: 52
  }

  // Data Binding: Property binding
  imageUrl = "https://plus.unsplash.com/premium_photo-1686245735403-a01147d86b89?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
  isDisabled = true;

  // Data Binding: Event binding
  doSomething() {
    console.log("Button Clicked....");
  }
  handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log("Input Value: ", inputElement.value);
  }

  // Data Binding: Two Way
  name = 'Rachit'
  name1 = new FormControl('');
}
