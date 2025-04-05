import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLoginPage = false;
  isAdmin = false;
  username: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe(() => {
      this.isLoginPage = this.router.url === '/login';
    });

    this.authService.getUserObservable().subscribe(user => {
      this.username = user?.username || null;
      this.isAdmin = user?.role === 'admin';
    });
  }

  logout() {
    this.authService.logout();
    this.username = null;
    this.isAdmin = false;
    this.router.navigate(['/login']);
  }
}
