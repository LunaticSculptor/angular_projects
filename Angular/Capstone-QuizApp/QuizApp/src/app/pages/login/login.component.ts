import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Username and password are required';
      return;
    }
    
    this.authService.login(this.username, this.password).subscribe(
      users => {
        if (!users.length) {
          this.errorMessage = 'Invalid credentials';
        }
      },
      () => this.errorMessage = 'Login failed, please try again'
    );
  }
}
