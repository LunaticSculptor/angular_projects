import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-example1',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './reactive-example1.component.html',
  styleUrl: './reactive-example1.component.css'
})
export class ReactiveExample1Component {
  
  registerForm!: FormGroup;

  private formBuilder = inject(FormBuilder);

  constructor() {
    // this.initFormViaFormGroup();
    this.initFormViaFormBuilder();
  }

  initFormViaFormGroup() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      gender: new FormControl('', Validators.required),
      terms: new FormControl(false, [Validators.requiredTrue])
    })
  }

  initFormViaFormBuilder() {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [
        Validators.required, 
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      age: new FormControl('', [Validators.required, Validators.min(18), Validators.max(100)]),
      gender: new FormControl('', Validators.required),
      terms: new FormControl(false, [Validators.requiredTrue])
    })
  }

  onSubmit() {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value);
  }

  onReset() {
    this.registerForm.reset();
  }
}
