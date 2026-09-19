import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movimentacoes } from '../../models/gestao-estoque/movimentacoes';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
    // Injecao do httpClient (Igual um @autowired do back )
  http = inject(HttpClient);

  //boa pratica
  API = "http://localhost:8080/estoques/movimentacoes";

  constructor(){}

  listAllByIdEstoque(id:number):Observable<Movimentacoes[]>{
    return this.http.get<Movimentacoes[]>(`${this.API}/historico/${id}`);
  }

  saveEntrada(movimentacao: Movimentacoes): Observable<string> {
    return this.http.post<string>(`${this.API}/entrada`, movimentacao, { responseType: 'text' as 'json' });
  }

  saveSaida(movimentacao: Movimentacoes): Observable<string> {
    return this.http.post<string>(`${this.API}/saida`, movimentacao, { responseType: 'text' as 'json' });
  }
}
