import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  // Check role if required
  if (route.data?.['role'] && route.data['role'] !== user.role) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
