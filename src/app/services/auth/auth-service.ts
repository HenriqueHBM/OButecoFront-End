import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ResponseAuth } from '../../models/auth/responseAuth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API = "http://localhost:8080";

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
}
