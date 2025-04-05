import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-return-book',
  imports: [ReactiveFormsModule],
  templateUrl: './return-book.component.html',
  styleUrl: './return-book.component.css'
})
export class ReturnBookComponent {
  private formBuilder = inject(FormBuilder);
  private bookService = inject(BookService);

  booksList = signal(this.bookService.getCheckedoutBooks());

  returnForm = signal<FormGroup | null>(null);

  constructor() {
    this.initForm();
  }

  initForm() {
    const form = this.formBuilder.group({
      returnInfo: this.formBuilder.group({
        bookTitle: ['', [Validators.required]],
        bookReturnDate: ['', [Validators.required, this.validateReturnDate.bind(this)]],
      }),
    });
    this.returnForm.set(form);
  }

  // ✅ Custom Validator: Return date must be today or in the past & on/after checkout date
  validateReturnDate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) return { futureDate: true };

    const selectedBook = this.bookService.booksCheckedOut.find(book => book.bookTitle === this.returnForm()?.value.returnInfo.bookTitle);
    if (selectedBook) {
      const checkoutDate = new Date(selectedBook.bookCheckoutDate);
      checkoutDate.setHours(0, 0, 0, 0);
      if (selectedDate < checkoutDate) return { invalidReturnDate: true };
    }

    return null;
  }

  onSubmit() {
    if (this.returnForm()?.invalid) {
      this.returnForm()?.markAllAsTouched();
      return;
    }

    const { bookTitle, bookReturnDate } = this.returnForm()?.value.returnInfo;
    this.bookService.returnBook(bookTitle);
    
    // ✅ Update the book list to exclude returned books
    this.booksList.set(this.bookService.getCheckedoutBooks());

    console.log(`Returned: ${bookTitle} on ${bookReturnDate}`);
    this.returnForm()?.reset();
  }
}
