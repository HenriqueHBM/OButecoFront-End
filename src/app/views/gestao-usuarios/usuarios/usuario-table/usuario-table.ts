import { Component } from '@angular/core';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioForm } from '../usuario-form/usuario-form';

@Component({
  selector: 'app-usuario-table',
  imports: [],
  templateUrl: './usuario-table.html',
  styleUrl: './usuario-table.scss',
})


export class UsuarioTable {
  modalRef: MdbModalRef<UsuarioForm> | null = null;
  
  list_usuarios: Usuario[] = JSON.parse(localStorage.getItem("lista_usuarios") ?? "[]");
  
  constructor(
    private modalService: MdbModalService
  ) { }

  openEditar(id: number) {
    this.modalRef = this.modalService.open(UsuarioForm, {
      modalClass: 'modal-lg',
      data: {
        usuario: this.list_usuarios[id - 1]
      }
    });
  }

  changeStatus(usuario: Usuario) {
    if (confirm(`Deseja mesmo ${usuario.status ? "Inativar" : "Ativar"} eses usuário?`)) {
      this.list_usuarios[usuario.id - 1].status = !usuario.status;
    }
  }
}
