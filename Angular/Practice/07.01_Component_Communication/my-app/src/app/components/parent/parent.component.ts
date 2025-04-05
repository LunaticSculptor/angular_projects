import { Component, ViewChild, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, HttpClientModule, CommonModule],
  templateUrl: './parent.component.html',
  styleUrl: './parent.component.css'
})
export class ParentComponent {

  // Using @Input Example
  parentMessage = 'Message from parent';

  // Using @Output Example
  receivedMessage: string="";
   receiveMessage($event: any) {
    this.receivedMessage = $event;
  }

  // Using @ViewChild Example
  /*
  @ViewChild(ChildComponent)
  childComponent!: ChildComponent;
  ngAfterViewInit() {
    // Access child component and call its methods or access its properties
    this.childComponent.childMethod();
  };
  */

 // Using @ViewChildren Example
//  @ViewChildren(ChildComponent)
//   childrenComponents!: QueryList<ChildComponent>;
//   ngAfterViewInit() {
//     // Access child components and call their methods or access their properties
//     this.childrenComponents.forEach(child => {
//       child.someMethod();
//     });
//   }

  // Lifecycle hooks: Constructor, ngOnChanges
  // Same for ngOnInit
  // arbitaryData:string="initial";
  // constructor(){
  //   setTimeout(() => {
  //     this.arbitaryData="final";
  //   }, 5000)
  // }

  // ngDoCheck: Triggers only with input change or event occurance, so will not change the clock but change the age
  // Not related to child here
  // currentTime: string="";
  // ngDoCheck() {
  //   const newTime = new Date().toLocaleTimeString();
  //   if (this.currentTime !== newTime) {
  //     this.currentTime = newTime;
  //   }
  // }
  // user = { name: "Alice", age: 25 };
  // prevAge = this.user.age;
  // ngDoCheck() {
  //   if (this.user.age !== this.prevAge) {
  //     console.log("User age changed!", this.user.age);
  //     this.prevAge = this.user.age; // Update previous value
  //   }
  // }
  // updateAge() {
  //   this.user.age++; // Angular doesn't detect this, but ngDoCheck does
  // }

  // ngAfterContentInit: Used in child

  // ngAfterContentChecked: invoked during the Angular change detection cycle
  // @ViewChild('projectedContent') projectedContent!: ElementRef;
  // changeContent() {
  //   this.projectedContent.nativeElement.textContent = "The content has changed!";
  // }

  // ngAfterViewInit: In child

  // ngAfterViewChecked: called every time Angular runs change detection after rendering the component's view
  // message: string = 'Initial Message';
  // constructor() {}
  // ngAfterViewChecked() {
  //   console.log('View checked');
  // }
  // ngAfterViewInit() {
  //   console.log('View Init');
  // }
  // updateMessage() {
  //   this.message = 'Updated Message';
  // }

  // ngOnDestroy: fires upon a component’s removal from the view and subsequent DOM
  message: string = 'Initial Message';
  destroy: boolean = true;
  toggleDestroy() {
    console.log(this.destroy)
    this.destroy = !this.destroy;
  }
  constructor() {}
  ngAfterViewInit() {
    console.log('Parent View Init');
  }

}
