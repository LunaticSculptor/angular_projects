import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-update-inventory',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-inventory.component.html',
  styleUrl: './update-inventory.component.css'
})
export class UpdateInventoryComponent {
  updateForm = signal<FormGroup | null>(null);
  private formBuilder = inject(FormBuilder);
  private bookService = inject(BookService);

  booksList = signal(this.bookService.getBooks());

  constructor() {
    this.initForm();
  }

  initForm() {
    const form = this.formBuilder.group({
      bookTitle: ['', [Validators.required]],
      bookQuantity: ['', [Validators.required], [this.quantityValidator.bind(this)]]
    });
    this.updateForm.set(form);
  }

  quantityValidator(control: AbstractControl) {
    const checkQuantity = control.value < 0 ? { invalidQuantity: true } : null;
    return of(checkQuantity);
  }

  onSubmit() {
    if (this.updateForm()?.invalid) {
      this.updateForm()?.markAllAsTouched();
      return;
    }

    const { bookTitle, bookQuantity } = this.updateForm()?.value;
    this.bookService.updateBookQuantity(bookTitle, bookQuantity);
    this.booksList.set(this.bookService.getBooks());
    console.log('Updated inventory', this.updateForm()?.value);
    this.bookService.getBooks();
    this.updateForm()?.reset();
  }
}
