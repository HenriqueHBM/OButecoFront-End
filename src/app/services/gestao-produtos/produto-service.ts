import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto, ProdutoRequest } from '../../models/gestao-produtos/produto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  
  http =  inject(HttpClient);

  API = `${environment.apiUrl}/produtos`;

  constructor(){ }

  listAll(): Observable<Produto[]> {
    
    return this.http.get<Produto[]>
    (`${this.API}`);
  }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  save(produto: ProdutoRequest): Observable<string> {
    return this.http.post<string>(`${this.API}`, produto, { responseType: 'text' as 'json' });
  }

  changeStatus(id:number): Observable<string>{
    return this.http.patch<string>(`${this.API}/change_status/${id}`,null);
  }

  updateProduto(produto: ProdutoRequest): Observable<string>{
    return this.http.put<string>(`${this.API}/${produto.id}`, produto, { responseType: 'text' as 'json' });
  }

  deleteProduto(id:number): Observable<string>{
    return this.http.delete<string>(`${this.API}/${id}`);
  }
}
