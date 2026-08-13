import { Component } from '@angular/core';
import { Usuario } from '../../../../../models/usuarios/usuario';

@Component({
  selector: 'app-tabela-usuario',
  imports: [],
  templateUrl: './tabela-usuario.html',
  styleUrl: './tabela-usuario.scss',
})
export class TabelaUsuario {
  list_usuarios: Usuario[] = [];

  constructor() {
    let u1 = new Usuario();
    u1.id = 1;
    u1.nome = "Henrique";
    u1.cargo = "Admin";
    u1.usuario = "henrique.madeira";
    u1.data_criacao = new Date('2026-06-06');
    u1.status = true;
    this.list_usuarios.push(u1);
  }
}
