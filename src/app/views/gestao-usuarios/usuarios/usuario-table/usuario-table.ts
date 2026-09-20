import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';
import { StatusEnum } from '../../../../Enums/status-enum';

@Component({
  selector: 'app-usuario-table',
  imports: [],
  templateUrl: './usuario-table.html',
  styleUrl: './usuario-table.scss',
})


export class UsuarioTable {
  protected readonly status = StatusEnum;
  // @Input("usuarios") usuarios :Usuario[] = [];
  // Nova forma 
  usuarios = input<Usuario[]>([]);

  formatarData(data: string): string {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  // @Output("editar") editar = new EventEmitter<Usuario>();
  // @Output("editar") editar = new EventEmitter<Usuario>();
  // @Output("changeStatus") changeStatus = new EventEmitter<Usuario>();
  // @Output("excluir") excluir = new EventEmitter<Usuario>();

  // Nova forma
  editar = output<Usuario>();
  changeStatus = output<Usuario>();
  excluir = output<Usuario>();
}
