import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from '../../models/gestao-produtos/produto';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  
  http =  inject(HttpClient);

  API = "http//localhost:8080/produtos";

  constructor(){ }

  listAll(): Observable<Produto[]> {
    
    return this.http.get<Produto[]>
    (`${this.API}`);
  }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  save(produto: Produto): Observable<string> {
    return this.http.post<string>(`${this.API}`, produto, { responseType: 'text' as 'json' });
  }

  changeStatus(id:number): Observable<string>{
    return this.http.patch<string>(`${this.API}/change_status/${id}`,null);
  }

  updateProduto(produto: Produto): Observable<string>{
    return this.http.put<string>(`${this.API}/${produto.id}`, produto, { responseType: 'text' as 'json' });
  }
}
