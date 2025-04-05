import { Component } from '@angular/core';
import { MyModuleModule } from './modules/my-module/my-module.module';

@Component({
  selector: 'app-root', // ✅ Ensure the selector matches index.html
  standalone: true,
  imports: [MyModuleModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
}
