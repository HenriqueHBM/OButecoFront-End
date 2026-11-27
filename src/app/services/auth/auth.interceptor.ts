import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.accessToken();
  const chamada_api = request.url.startsWith(environment.apiUrl);
  const requisicao_login = request.url  === `${environment.apiUrl}/login`;

  // envia o token em todas as requisições, menos na de login
  if (token && chamada_api && !requisicao_login) {
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

      if (err instanceof HttpErrorResponse && err.status === 403) {
        Swal.fire({ 
          icon: 'warning',
          title: 'Sem permissão',
          text: 'Seu cargo não permite esta ação.', 
        });
      }

    
      return throwError(() => err);
    })
  );
};
