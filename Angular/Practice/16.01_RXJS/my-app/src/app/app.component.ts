import { Component } from '@angular/core';
import { BehaviorSubject, catchError, concatMap, delay, from, fromEvent, interval, mergeMap, of, retry, retryWhen, scan, Subject, take, throwError, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs';

  // formEvent() operator
  // constructor() {
  //   const c = fromEvent(document, 'click');  
  //   c.subscribe((x) => console.log(x));
  // }

  // interval(time): Observable or interval(period: number, scheduler: Scheduler): Observable
  // source = interval(1000);
  // ngAfterViewInit(){
  //   //emit value in sequence every 1 second  
  //   this.source.subscribe(val => console.log(val));  
  // }

  // timer operator: observable that starts emitting after a specified delay. It emits a single value and completes
  // ngAfterViewInit(){
  //   const delayed = timer(1000);
  //   delayed.subscribe(x => console.log(x)); // // Emit 0 after 1 second
  // }

  // of() operator
  // ngAfterViewInit(){
  //   const observable = of(1, 2, 3, 4);
  //   observable.subscribe({
  //     next: value => console.log(value),
  //     complete: () => console.log('Completed')
  //   });
  // }

  // from() operator: with array
  // ngAfterViewInit() {
  //   const arraySource = from([10, 20, 30, 40]);
  //   arraySource.subscribe({
  //     next: value => console.log(value),
  //     complete: () => console.log('Completed')
  //   });
  // }

  // from() operator: with promise
  // ngAfterViewInit() {
  //   const promiseSource = from(fetch('https://api.github.com/users/octocat').then(response => response.json()));
  //   promiseSource.subscribe({
  //     next: value => console.log(value),
  //     complete: () => console.log('Completed')
  //   });
  // }

  // take() operator
  // ngAfterViewInit(){
  //   // Example 1: Taking a fixed number of emissions from a finite observable
  //   const numbers = of(1, 2, 3, 4, 5);
  //   numbers.pipe(
  //     take(3)
  //   ).subscribe({
  //     next: value => console.log(value),
  //     complete: () => console.log('Completed')
  //   });

  //   // Output: 1, 2, 3, "Completed"


  //   // Example 2: Taking a limited number of emissions from an infinite observable
  //   const periodicEmissions = interval(1000);
  //   const firstThree = periodicEmissions.pipe(
  //     take(3)
  //   );
  //   firstThree.subscribe({
  //     next: value => console.log(value),
  //     complete: () => console.log('Completed')
  //   });
  //   // Output: 0, 1, 2, "Completed"
  // }

  // retry() operator: used to resubscribe to the source observable a specific number of times if it fails due to an error.
  // ngAfterViewInit() {
  //   const source = interval(1000);
  //   const example = source.pipe(
  //     mergeMap(val => {
  //       if (val > 2) {
  //         return throwError('Error!');
  //       }
  //       return of(val);
  //     }),
  //     retry(2)  // Retry up to 2 times before failing for good
  //   );
  //   example.subscribe({
  //     next: value => console.log(value),
  //     error: err => console.log(err)
  //   });

  //   // Output: 0, 1, 2, 0, 1, 2, 0, 1, 2, "Error!"
  // }

  // ngAfterViewInit(){
  //   const source = interval(1000);
  //   const example = source.pipe(
  //     mergeMap(val => {
  //       if (val > 1) {
  //         return throwError('Error!');
  //       }
  //       return of(val);
  //     }),
  //     retryWhen(errors =>
  //       errors.pipe(
  //         scan((acc, value) => {
  //           if (acc >= 2) {
  //             throw 'Giving up!';
  //           }
  //           return acc + 1;
  //         }, 0),
  //         delay(1000)
  //       )
  //     )
  //   );
  //   example.subscribe({
  //     next: value => console.log(value),
  //     error: err => console.log(err)
  //   });

  //   // Output: 0, 1, 0, 1, 0, 1, "Giving up!"
  // }

  // ngAfterViewInit(){
  //   const source = of(1, 2, 3);
  //   const example = source.pipe(
  //     concatMap(val => of(`Processed: ${val}`).pipe(delay(1000)))
  //   );
  //   example.subscribe(console.log);
  // }

  // ngAfterViewInit(){
  //   const subject = new Subject();
  //   subject.subscribe({
  //     next: (v) => console.log(`observerA: ${v}`)
  //   });
  //   subject.next(1);
  //   subject.next(2);
  //   subject.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`)
  //   });
  //   subject.next(3);
  // }

  // BehaviorSubject
  // ngAfterViewInit(){
  //   const behaviorSubject = new BehaviorSubject(0); // 0 is the initial value
  //   behaviorSubject.subscribe({
  //     next: (v) => console.log(`observerA: ${v}`)
  //   });

  //   behaviorSubject.next(1);
  //   behaviorSubject.next(2);
  //   behaviorSubject.subscribe({
  //     next: (v) => console.log(`observerB: ${v}`)
  //   });
  //   behaviorSubject.next(3);
  // }


  // catchError
  // ngAfterViewInit(){
  //   const source = throwError(() => new Error('This is an error!'));
  //   const example = source.pipe(
  //     catchError(error => {
  //       console.error('Error caught: ', error);
  //       return of('I caught the error and recovered!');
  //     })
  //   );
  //   example.subscribe({
  //     next: value => console.log(value),
  //     error: err => console.log('Still received an error:', err),
  //     complete: () => console.log('Complete')
  //   });


  //   // Output:
  //   // Error caught: Error: This is an error!
  //   // I caught the error and recovered!
  //   // Complete
  // }

  // throwError
  ngAfterViewInit(){
    const source = of(1, 2, 3, 4, 5);
    const example = source.pipe(
      mergeMap(val => {
        if (val > 3) {
          return throwError(() => new Error(`Value ${val} is too high!`));
        }
        return of(val);
      })
    );
    example.subscribe({
      next: value => console.log(value),
      error: err => console.log('Error:', err.message)
    });

    // Output:
    // 1
    // 2
    // 3
    // Error: Value 4 is too high!
  }
}
