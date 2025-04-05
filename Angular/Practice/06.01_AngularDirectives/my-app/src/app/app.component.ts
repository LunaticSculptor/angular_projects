import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms'; // necessary for using [(ngModel)]
import { CommonModule } from '@angular/common'; // necessary for using [ngStyle]
import { SearchPipe } from './search.pipe'; // necessary for custom pipe

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule, SearchPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  // Componet Directive: component directive represents a reusable UI component in Angular
  name = 'John'
  changeName() {
    this.name = 'Cena'
  }

  // Attribute Directives: modify the appearance or behavior of DOM elements or components: ngStyle, ngClass, ngModel
  // ngStyle
  selectedColor = 'lightblue';
  applyColor() {
    // No need for additional logic here, ngModel will update selectedColor automatically.
  }
  // ngClass
  isHighlighted = false;
  isItalic = false;
  toggleStyles() {
    this.isHighlighted = !this.isHighlighted
    this.isItalic = !this.isItalic
  }

  // Structure Directives: add or remove elements from the DOM based on certain conditions
    // ngIf
    showMessage: boolean = false;
    // ngFor
    items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    // @if and @else directives
    loggedIn = false;
    toggleLogin() {
      this.loggedIn = !this.loggedIn;
    }
    // @for and @empty directives
    users = [
      {id: 1, name: 'User 1'},
      {id: 2, name: 'User 2'}
    ];
    addUser() {
      const newId = this.users.length + 1;
      this.users.push({id: newId, name: `User ${newId}`});
    }
    clearUsers() {
      this.users = [];
    }


  // Pipes: transform data displayed in a template
  currentDate: Date = new Date();
    // Custom
  items1: string[] = ['Apple', 'Banana']
  searchTerm = ''
}
