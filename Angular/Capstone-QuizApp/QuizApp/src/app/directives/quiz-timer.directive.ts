import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appQuizTimer]',
  standalone: true,
})
export class QuizTimerDirective implements OnInit {
  @Input() countdown: number = 3;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    let counter = this.countdown;
    this.el.nativeElement.innerText = counter;

    const interval = setInterval(() => {
      counter--;
      if (counter > 0) {
        this.el.nativeElement.innerText = counter;
      } else {
        clearInterval(interval);
        this.el.nativeElement.innerText = "Go!";
      }
    }, 1000);
  }
}
