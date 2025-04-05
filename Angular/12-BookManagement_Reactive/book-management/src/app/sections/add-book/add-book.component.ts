import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-add-book',
  imports: [ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  addForm = signal<FormGroup | null> (null);
  private formBuilder = inject(FormBuilder);
  private bookService = inject(BookService);

  constructor() {
    this.initForm();
  }

  initForm() {
    const form = this.formBuilder.group({
      bookInfo: this.formBuilder.group({
          bookTitle: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          bookAuthor: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
          bookISBN: [
            '', 
            [
              Validators.required,
              Validators.pattern('^(?=(?:[^0-9]*[0-9]){10}(?:(?:[^0-9]*[0-9]){3})?$)[\\d-]+$'),
              // It is a unique 10 or 13-digit.
              // It may or may not contain a hyphen.
              // It should not contain whitespaces and other special characters.
              // It does not allow alphabet letters.
            ]
          ],
          bookQuantity: ['', [Validators.required], [this.quantityValidator.bind(this)]]
        }),
      });
    this.addForm.set(form);
  }

  quantityValidator(control: AbstractControl){
    // console.log(control.value, typeof control.value);
    
    const checkQuantity = (control.value < 0)
      ? {invalidQuantity: true} : null

    // console.log('Quantity Validator', checkQuantity?.invalidQuantity)
    // RXJS operator of() returns an observable object
    return of(checkQuantity);
  }

  onSubmit(){
    if(this.addForm()?.invalid){
      this.addForm()?.markAllAsTouched();
      return;
    }
    this.bookService.booksList.push(this.addForm()?.value.bookInfo);
    this.bookService.getBooks();
    console.log(this.addForm()?.value);
    this.addForm()?.reset();
  }
}
