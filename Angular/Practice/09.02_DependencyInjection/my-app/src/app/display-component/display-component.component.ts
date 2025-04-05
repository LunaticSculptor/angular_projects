import { Component, inject } from '@angular/core';
import { TextServiceService } from '../services/text-service.service';
// import { TextServiceService } from '../services/text-service.service';

@Component({
  selector: 'app-display-component',
  imports: [],
  templateUrl: './display-component.component.html',
  styleUrl: './display-component.component.css'
})
export class DisplayComponentComponent {
  // constructor(private textService: TextServiceService) { }
  // getText(): string {
  //   return this.textService.getText();
  // }
  public service = inject(TextServiceService);
}
