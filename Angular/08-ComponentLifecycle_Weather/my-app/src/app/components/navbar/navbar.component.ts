import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() citySelected = new EventEmitter<string>();
  selectedCity: string = '';

  onCityChange() {
    this.citySelected.emit(this.selectedCity);
  }
}
