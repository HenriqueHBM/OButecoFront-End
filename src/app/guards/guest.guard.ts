import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';


export const guestGuard: CanActivateFn = () => {
 const auth = inject(AuthService);
  return auth.isLogado() ? inject(Router).createUrlTree(['/home']) : true;
};