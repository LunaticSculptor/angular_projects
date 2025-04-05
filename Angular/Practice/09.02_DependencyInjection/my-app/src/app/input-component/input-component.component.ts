import { Component, inject } from '@angular/core';
// import { TextServiceService } from '../services/text-service.service';
import { FormsModule } from '@angular/forms';
import { TextServiceService } from '../services/text-service.service';

@Component({
  selector: 'app-input-component',
  imports: [FormsModule],
  templateUrl: './input-component.component.html',
  styleUrl: './input-component.component.css'
})
export class InputComponentComponent {
  // text:string="";
  // constructor(private textService:TextServiceService){}
  // onChange():void{
  //   this.textService.setText(this.text);
  // }

  public service = inject(TextServiceService);
}
