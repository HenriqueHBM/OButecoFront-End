import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimentacaoRequest, Movimentacoes } from '../../models/gestao-estoque/movimentacoes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
    // Injecao do httpClient (Igual um @autowired do back )
  http = inject(HttpClient);

  //boa pratica
  API = `${environment.apiUrl}/estoques/movimentacoes`;

  constructor(){}

  listAllByIdEstoque(id:number):Observable<Movimentacoes[]>{
    return this.http.get<Movimentacoes[]>(`${this.API}/historico/${id}`);
  }

  saveEntrada(movimentacao: MovimentacaoRequest): Observable<string> {
    return this.http.post<string>(`${this.API}/entrada`, movimentacao, { responseType: 'text' as 'json' });
  }

  saveSaida(movimentacao: MovimentacaoRequest): Observable<string> {
    return this.http.post<string>(`${this.API}/saida`, movimentacao, { responseType: 'text' as 'json' });
  }
}
