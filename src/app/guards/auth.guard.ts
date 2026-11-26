import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLogado()) {
    return true;
  }

  auth.logout();

  return router.createUrlTree(['/login'], {
    queryParams: { returnUrl: state.url },
  });
};