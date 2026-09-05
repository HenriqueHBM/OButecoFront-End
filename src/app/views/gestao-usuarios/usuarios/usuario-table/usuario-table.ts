import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';

@Component({
  selector: 'app-usuario-table',
  imports: [],
  templateUrl: './usuario-table.html',
  styleUrl: './usuario-table.scss',
})


export class UsuarioTable {
  
  // @Input("usuarios") usuarios :Usuario[] = [];
  // Nova forma 
  usuarios = input<Usuario[]>([]);
  
  // @Output("editar") editar = new EventEmitter<Usuario>();
  @Output("editar") editar = new EventEmitter<Usuario>();
  @Output("changeStatus") changeStatus = new EventEmitter<Usuario>();
  @Output("excluir") excluir = new EventEmitter<Usuario>();

  // Nova forma
  // editar       = output<Usuario>();
}
