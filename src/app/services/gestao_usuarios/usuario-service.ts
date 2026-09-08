import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../models/gestao-usuarios/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  // Injecao do httpClient (Igual um @autowired do back )
  http = inject(HttpClient);

  //boa pratica
  API = "http://localhost:8080/usuarios";

  constructor() { }

  // Observable: gerenciador de eventos assincrono
  listAll(): Observable<Usuario[]> {
    // Verbo http
    return this.http.get<Usuario[]> //montar como uma lista pois vem um array do back(cuidar com as declaracoes)
      (`${this.API}`); //endpoit do back-end
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API}`);
  }

  save(usuario: Usuario): Observable<string> {
    // post(verbo), <string> (retorno), this.API/save (enpoit), usuarios (body), responseType (parametros)
    return this.http.post<string>(`${this.API}`, usuario, { responseType: 'text' as 'json' });
  }

  changeStatus(id:number): Observable<string>{
    return this.http.patch<string>(`${this.API}/change_status/${id}`,null);
  }

  updateUsuario(usuario: Usuario): Observable<string>{
    return this.http.put<string>(`${this.API}/${usuario.id}`, usuario, { responseType: 'text' as 'json' });
  }
}
