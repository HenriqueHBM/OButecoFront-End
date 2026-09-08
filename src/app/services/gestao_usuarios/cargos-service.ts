import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cargo } from '../../models/gestao-usuarios/cargo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CargosService {

  http = inject(HttpClient);

  API = "http://localhost:8080/usuarios/cargos";

  constructor(){}

    listAll(): Observable<Cargo[]> {
      // Verbo http
      return this.http.get<Cargo[]> //montar como uma lista pois vem um array do back(cuidar com as declaracoes)
        (`${this.API}`); //endpoit do back-end
    }
}
