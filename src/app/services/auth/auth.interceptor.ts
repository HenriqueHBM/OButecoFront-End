import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.accessToken();
  const requisicao_login = request.url.endsWith("/login");

  // envia o token em todas as requisições, menos na de login
  if (token && !requisicao_login) {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(request).pipe(
    catchError((err) => {
      // 401 = token inválido/expirado: limpa e volta pro login
      // 403 = logado, mas o cargo não tem permissão: não desloga, a tela trata o erro
      if (err instanceof HttpErrorResponse && err.status === 401 && !requisicao_login) {
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};
