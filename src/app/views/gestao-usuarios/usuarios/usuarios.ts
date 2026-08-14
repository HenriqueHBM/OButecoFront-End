import { Component } from '@angular/core';
import { UsuarioForm } from './usuario-form/usuario-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioTable } from './usuario-table/usuario-table';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  imports: [UsuarioTable],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {
    modalRef: MdbModalRef<UsuarioForm> | null = null;

  constructor(
    private modalService: MdbModalService,
    private _location: Location
  ) { }

  openCadastrar() {
    this.modalRef = this.modalService.open(UsuarioForm, {
      modalClass: 'modal-lg '
    })
  }

  backCliked(){
    this._location.back();
  }
}
