import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ResponseAuth } from '../../models/auth/responseAuth';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API = `${environment.apiUrl}`;

  accessToken = signal(sessionStorage.getItem('token') ?? '');

  login(usuario: string, senha: string) {
    this.logout();
    return this.http.post<ResponseAuth>(`${this.API}/login`, { usuario, senha })
      .pipe(
        // salva o token para o interceptor enviar nas próximas requisições
        tap(resposta => {
          this.accessToken.set(resposta.token);
          sessionStorage.setItem("token", resposta.token);
        })
      );
  }

  logout() {
    this.accessToken.set("");
    sessionStorage.removeItem("token");
  }

    // Verifica se existe um token válido
  isLogado(): boolean {
    const token = this.accessToken();
    if (!token) return false;

    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(atob(base64));

      return !payload.exp || payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}