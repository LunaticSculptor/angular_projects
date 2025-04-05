import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'user';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:3000/users';
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}?username=${username}&password=${password}`).pipe(
      tap(users => {
        if (users.length) {
          localStorage.setItem('user', JSON.stringify(users[0]));
          this.userSubject.next(users[0]);
          this.router.navigate([users[0].role === 'admin' ? '/create' : '/quizzes']);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  getUser(): User | null {
    return this.userSubject.value;
  }

  getUserObservable(): Observable<User | null> {
    return this.user$;
  }

  getUsernameById(userId: number): Observable<string> {
    return this.http.get<User>(`${this.baseUrl}/${userId}`).pipe(
      map(user => user.username)
    );
  }

  isAdmin(): boolean {
    return this.getUser()?.role === 'admin';
  }

  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
