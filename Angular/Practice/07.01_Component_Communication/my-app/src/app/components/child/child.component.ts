import { HttpClient } from '@angular/common/http';
import { Component, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child',
  imports: [CommonModule],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  // Data sharing via @Input from parent to child
  @Input() childMessage: string = "";

  // Data Sharing via @Output from child to parent
  @Output() messageEvent = new EventEmitter<string>();
  sendMessage() {
    this.messageEvent.emit("Hello from Child!");
  }

  // Using @ViewChild: declare a property in the parent component that holds a reference to the child component instance
  childMethod() {
    console.log('Method in ChildComponent called from ParentComponent');
  }

  // Using @ViewChildren: allows the parent component to query for multiple child components of the same type.
  someMethod() {
    console.log('Method in ChildComponent called from ParentComponent: 2');
  }

  // Lifecycle hooks: Constructor and ngOnChanges
  // @Input() data:string="";
  //  lifecycleTicks:number=0;
  //  ngOnChanges(): void {
  //    this.lifecycleTicks++;
  //  }

   // ngOnInit: Will not fire when input changes, ticks will not increase
  //  ngOnInit(): void {
  //    this.lifecycleTicks++;
  //  }

  // ngDoCheck: Check Parent

  // ngAfterContentInit: called after Angular has fully initialized all of the content of a directive
  // @ContentChild('projectedContent', {static:true})
  // content!: ElementRef;
  // ngAfterContentInit(): void {
  //   console.log('Projected Content:', this.content.nativeElement.textContent);
  // }

  // ngAfterContentChecked: invoked during the Angular change detection cycle
  // @ContentChild('projectedContent') content!: ElementRef;
  // ngAfterContentChecked(): void {
  //   console.log('Projected Content:', this.content.nativeElement.textContent);
  // }

  // ngAfterViewInit: invoked after the view is completely loaded
  // users: any[] = [];
  // constructor(private http: HttpClient) {}
  // ngAfterViewInit(): void {
  //   console.log("View initialized. Fetching user data...");
  //   this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')
  //     .subscribe(
  //       (data) => {
  //         this.users = data;
  //         console.log("Users fetched:", this.users);
  //       },
  //       (error) => {
  //         console.error("Error fetching users:", error);
  //       }
  //     );
  // }

  // ngAfterViewChecked: In Parent

  // ngOnDestroy
  ngOnDestroy() {
    console.log("Goodbye World! Child Component Destroyed");
  }

}
