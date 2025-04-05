import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyNewComponentComponent } from '../my-new-component/my-new-component.component';

@NgModule({
  declarations: [MyNewComponentComponent], // ✅ Declare the component
  imports: [CommonModule], // ✅ Keep CommonModule
  exports: [MyNewComponentComponent], // ✅ Export it
})
export class MyModuleModule { }
