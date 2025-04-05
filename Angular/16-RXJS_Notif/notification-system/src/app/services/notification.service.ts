import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, interval, concatMap, takeUntil, Observable, of, switchMap, delay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications$ = new Subject<string>(); // Emits notifications
  private pause$ = new BehaviorSubject<boolean>(false); // Tracks pause state
  private stop$ = new Subject<void>(); // Handles cleanup
  private queue: string[] = []; // Stores missed notifications

  constructor() {
    this.generateNotifications();
  }

  private generateNotifications() {
    interval(2000 + Math.random() * 3000) // Random interval between 2-5 seconds
      .pipe(
        takeUntil(this.stop$),
        concatMap(() => {
          const notification = `🔔 New Notification at ${new Date().toLocaleTimeString()}`;
          return of(notification).pipe(delay(500)); // Simulate network delay
        }),
        tap((notification) => {
          if (this.pause$.value) {
            this.queue.push(notification); // Store missed notifications
          } else {
            this.notifications$.next(notification);
          }
        })
      )
      .subscribe();
  }

  getNotifications(): Observable<string> {
    return this.notifications$.asObservable();
  }

  togglePause() {
    const isPaused = this.pause$.value;
    this.pause$.next(!isPaused);

    if (!isPaused) {
      // Resume: Emit stored notifications from queue
      this.queue.forEach((notification) => this.notifications$.next(notification));
      this.queue = []; // Clear queue
    }
  }

  stopNotifications() {
    this.stop$.next(); // Cleanup
  }
}
