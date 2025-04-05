import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginServiceService } from '../../services/login-service/login-service.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(LoginServiceService);
  const router = inject(Router);

  const user = authService.getCurrentUser(); // Get logged-in user details

  if (user && user.role === 'admin') {
    return true; // Allow access
  } else {
    router.navigate(['/dashboard']); // Redirect to dashboard if not admin
    return false; // Block access
  }
};
