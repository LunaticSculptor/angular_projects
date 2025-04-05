import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-checkout-book',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout-book.component.html',
  styleUrl: './checkout-book.component.css'
})
export class CheckoutBookComponent {
  private formBuilder = inject(FormBuilder);
  private bookService = inject(BookService);

  // ✅ Store booksList reactively
  booksList = signal(this.bookService.getBooks());
  checkoutBooks = signal(this.bookService.getCheckedoutBooks());

  checkoutForm = signal<FormGroup | null>(null);

  constructor() {
    this.initForm();
  }

  initForm() {
    const form = this.formBuilder.group({
      checkoutInfo: this.formBuilder.group({
        bookTitle: ['', [Validators.required]],
        bookBorrower: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        bookCheckoutDate: ['', [Validators.required, this.validateCheckoutDate.bind(this)]],
      }),
    });
    this.checkoutForm.set(form);
  }

  validateCheckoutDate(control: AbstractControl) {
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    const checkDate = (selectedDate > today)
      ? {futureDate: true} : null
    return checkDate;
  }

  onSubmit() {
    if (this.checkoutForm()?.invalid) {
      this.checkoutForm()?.markAllAsTouched();
      return;
    }

    console.log(this.checkoutForm()?.value.checkoutInfo);
    this.bookService.booksCheckedOut.push(this.checkoutForm()?.value.checkoutInfo);
    this.bookService.getCheckedoutBooks();
    this.checkoutForm()?.reset();
  }
}
