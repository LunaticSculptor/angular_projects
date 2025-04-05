import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-reactive-example2',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './reactive-example2.component.html',
  styleUrl: './reactive-example2.component.css'
})
export class ReactiveExample2Component {

  registerForm = signal<FormGroup | null> (null);

  private formBuilder = inject(FormBuilder);

  constructor() {
    this.initForm();
  };

  initForm() {
    const registerForm = this.formBuilder.group({

      // personal details
      personal: this.formBuilder.group({
        username: [
          '', 
          [
            Validators.required, 
            Validators.minLength(3), 
            Validators.maxLength(50),
          ], // sync validators
          [
            this.usernameValidator.bind(this)
          ] // async validators
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }),

      // address details
      address: this.formBuilder.group({
        street: ['', Validators.required],
        city: ['', [Validators.required]],
        zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
      }),

      // dynamic phone numbers
      phoneNumbers: this.formBuilder.array([]),

      // terms & conditions
      terms: [false, Validators.requiredTrue]

    });

    this.registerForm.set(registerForm);
  }

  get phoneNumbers(): FormArray {
    return this.registerForm()?.get('phoneNumbers') as FormArray;
  }

  addPhoneNumber(){
    this.phoneNumbers.push(
      this.formBuilder.group({
        number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
        type: ['home', [Validators.required]]
      })
    );
    console.log(this.phoneNumbers.controls);    
  }

  removePhoneNumber(index: number){
    this.phoneNumbers.removeAt(index);
  }

  // custom async validator for username
  usernameValidator(control: AbstractControl){
    const forbiddenUsernames = ['test', 'admin', 'user'];

    // we seand usernameTaken object to check in the form
    const checkUsername = forbiddenUsernames.includes(control.value.toLowerCase())
      ? {usernameTaken: true} : null

    // RXJS operator of() returns an observable object
    return of(checkUsername).pipe(
      delay(1000) // simulate server delay
    );
  }

  onSubmit(){
    if(this.registerForm()?.invalid){
      this.registerForm()?.markAllAsTouched();
      return;
    }
    console.log(this.registerForm()?.value);
  }
}
