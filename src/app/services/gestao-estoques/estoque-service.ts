import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estoque } from '../../models/gestao-estoque/estoque';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EstoqueService {
  // Injecao do httpClient (Igual um @autowired do back )
  http = inject(HttpClient);

  //boa pratica
  API = "http://localhost:8080/estoques";

  constructor() { }

  listAll(): Observable<Estoque[]> {
    return this.http.get<Estoque[]> //montar como uma lista pois vem um array do back(cuidar com as declaracoes)
      (`${this.API}`); //endpoit do back-end
  }

  findById(id: number): Observable<Estoque> {
    return this.http.get<Estoque>(`${this.API}/${id}`);
  }

  save(estoque: Estoque): Observable<string> {
    // post(verbo), <string> (retorno), this.API/save (enpoit), estoques (body), responseType (parametros)
    return this.http.post<string>(`${this.API}`, estoque, { responseType: 'text' as 'json' });
  }

  
}
