import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  feedbackFormData: any = {};

  formConfig = {
    fields: [
      { type: 'text', label: 'Name', model: 'name', required: true },
      { type: 'email', label: 'Email', model: 'email', required: true },
      { type: 'date', label: 'Date of Visit', model: 'dateOfVisit', required: true, constraints: { noFutureDate: true } },
      { type: 'select', label: 'Type of Feedback', model: 'feedbackType', options: ['Compliment', 'Complaint', 'Suggestion'], required: true },
      { type: 'checkbox', label: 'Accept Terms & Conditions', model: 'termsAccepted', required: true },
      { type: 'textarea', label: 'Comments', model: 'comments' }
    ]
  };

  onSubmit() {
    if (this.isFormValid()) {
      console.log('Submitted Data:', this.feedbackFormData);
      alert('Feedback submitted successfully!');
    }
  }

  isFormValid(): boolean {
    return this.formConfig.fields.every(field => {
      if (field.required) {
        if (field.type === 'checkbox') {
          return this.feedbackFormData[field.model] === true;
        }
        return this.feedbackFormData[field.model]?.trim();
      }
      return true;
    });
  }

  isFutureDate(field: any): boolean {
    if (field.constraints?.noFutureDate && this.feedbackFormData[field.model]) {
      return new Date(this.feedbackFormData[field.model]) > new Date();
    }
    return false;
  }
}