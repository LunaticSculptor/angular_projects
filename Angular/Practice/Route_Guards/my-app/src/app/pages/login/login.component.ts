import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private auth = inject(AuthService);

  onSubmit(): void{
    const isUser = this.auth.login(this.email, this.password);

    if(isUser){
      this.errorMessage = '';

      // route to dashboard
      this.auth.navigateByUrl('/dashboard');

    }else{
      // display error message on invalid credentials
      this.errorMessage = 'Invalid email or password. Please try again.';
    }
  }
}
