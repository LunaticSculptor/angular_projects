import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginServiceService } from '../../services/login-service/login-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginServiceService);
  if(auth.isAuthenticated()){
    return true;
  }else{
    auth.navigateByUrl('/login');
    return false;
  }
};
