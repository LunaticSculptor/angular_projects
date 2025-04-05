import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const adminsOnlyGuard: CanMatchFn = (route, segments) => {
  const auth = inject(AuthService);
  if(auth.hasRole('admin')){
    return true;
  }else{
    auth.navigateByUrl('/login');
    return false;
  }
};
