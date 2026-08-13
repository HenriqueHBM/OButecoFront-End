import { Component } from '@angular/core';
import { UsuarioForm } from './usuario-form/usuario-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioTable } from './usuario-table/usuario-table';

@Component({
  selector: 'app-usuarios',
  imports: [UsuarioTable],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
    modalRef: MdbModalRef<UsuarioForm> | null = null;

  constructor(private modalService: MdbModalService) { }

  openCadastrar() {
    this.modalRef = this.modalService.open(UsuarioForm)
  }
}
