import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private users: User[] = [
    {id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin'},
    {id: 2, email: 'manager@example.com', password: 'manager123', role: 'manager'},
    {id: 3, email: 'user@example.com', password: 'user123', role: 'user'},
  ]

  private currentUser: User|null = null;
  private router = inject(Router);

  constructor() { }

  login(email: string, password: string): boolean{
    const user = this.users.find(
      (u) => u.email === email && u.password === password
    )
    if(user){
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
  
      return true;
    }
    return false;
  }

  logout(): void{
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.navigateByUrl('/login');
  }

  getCurrentUser(): User|null {
    if(!this.currentUser){
      const userData = localStorage.getItem('currentUser');
      if(userData){
        this.currentUser = JSON.parse(userData) as User;
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: 'manager' | 'admin' | 'user'): boolean {
    return this.currentUser?.role === role;
  }

  navigateByUrl(url: string): void {
    this.router.navigateByUrl(url, {replaceUrl: true});
  }

}
