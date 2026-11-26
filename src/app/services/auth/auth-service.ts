import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ResponseAuth } from '../../models/auth/responseAuth';
import { environment } from '../../../environments/environment';
import { CargosEnum } from '../../Enums/cargos-enum';

const NIVEL_CARGO: Record<CargosEnum, number> = {
  [CargosEnum.Estagiario]: 1,
  [CargosEnum.Auxiliar]: 2,
  [CargosEnum.Gerente]: 3,
  [CargosEnum.Admin]: 4, 
};
      
interface TokenPayload {
  sub: string; id: number;
  cargo: CargosEnum;
  exp: number;
}

function lerPayload(token: string): TokenPayload | null {
  if (!token) return null;
  try {
    const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64)); 
  } catch {
   return null; 
  } 
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private http = inject(HttpClient);
  private API = `${environment.apiUrl}`;

  accessToken = signal(sessionStorage.getItem('token') ?? '');

  private payload = computed(() => lerPayload(this.accessToken()));

  cargo = computed(() => this.payload()?.cargo ?? null);

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
    const p = this.payload();
    return !!p && p.exp * 1000 > Date.now();
  }

  // true se o cargo é igual ou acima do mínimo (igual ao hasRole do back)
  temCargo(minimo: CargosEnum): boolean {
    const atual = this.cargo();
    return !!atual && NIVEL_CARGO[atual] >= NIVEL_CARGO[minimo];
  }
}