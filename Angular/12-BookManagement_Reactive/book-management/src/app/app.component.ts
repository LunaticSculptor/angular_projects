import { Component } from '@angular/core';
import { AddBookComponent } from './sections/add-book/add-book.component';
import { CheckoutBookComponent } from './sections/checkout-book/checkout-book.component';
import { ReturnBookComponent } from './sections/return-book/return-book.component';
import { UpdateInventoryComponent } from './sections/update-inventory/update-inventory.component';
import { FormsModule, NgForm } from '@angular/forms';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    AddBookComponent,
    CheckoutBookComponent,
    ReturnBookComponent,
    UpdateInventoryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'book-management';

  operation = null;
  // isSubmitted = false;

  onSubmit(form: NgForm) {
    // console.log('form data: ', this.user);
    if(form.invalid){
      // console.log('Invalid Form');
      return;
    }
    // this.isSubmitted = true;
    // console.log('form data: ', form.value);
    // this.user.name='';
    // this.user.email='';
  }
}
