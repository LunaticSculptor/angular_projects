import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Ensure FormsModule is imported

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-app';

  Fields = [
    { fieldName: "Full-Name", type: "text", placeHolder: "Enter your full name", value: "", maxLength: 30 },
    { fieldName: "Date-of-Birth", type: "text", placeHolder: "Enter your DOB (DD-MM-YYYY)", value: "", maxLength: 10 },
    { fieldName: "Mobile", type: "text", placeHolder: "Enter your contact number", value: "", maxLength: 10 },
    { fieldName: "Age", type: "number", placeHolder: "Calculated Age", value: "", disabled: true }
  ];

  handleInput(fieldName: string, event: any) {
    switch (fieldName) {
      case "Date-of-Birth":
        this.formatDateOfBirth(event);
        break;
      case "Full-Name":
        this.validateName(event);
        break;
      case "Mobile":
        this.validateMobile(event);
        break;
      default:
        break;
    }
  }

  formatDateOfBirth(event: any) {
    // Remove non-numeric characters
    let value = event.target.value.replace(/\D/g, "");
    if (value.length > 8) value = value.substring(0, 8);

    let formattedValue = "";
    if (value.length > 0) formattedValue += value.substring(0, 2);
    if (value.length > 2) formattedValue += "-" + value.substring(2, 4);
    if (value.length > 4) formattedValue += "-" + value.substring(4, 8);

    event.target.value = formattedValue;
    this.updateAge(formattedValue);
  }

  updateAge(dob: string) {
    const parts = dob.split("-");
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const birthDate = new Date(year, month, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        this.Fields.find(field => field.fieldName === "Age")!.value = age.toString();
      }
    }
  }

  validateName(event: any) {
    event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
  }

  validateMobile(event: any) {
    // Remove any non-digit characters from mobile input
    const original = event.target.value;
    const sanitized = original.replace(/\D/g, "");
    if (sanitized !== original) {
      event.target.value = sanitized;
    }
  }

  checkForDisabled(fieldName: string) {
    return fieldName === "Age";
  }
}
