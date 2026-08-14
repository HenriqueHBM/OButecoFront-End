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
    list_usuarios: Usuario[] = [];
    modalRef : MdbModalRef<UsuarioForm> | null = null;

    constructor(
      private modalService: MdbModalService
    ) {

      let u1 = new Usuario();
      u1.id = 1;
      u1.nome = "Henrique";
      u1.cargo = "Admin";
      u1.usuario = "henrique.madeira";
      u1.data_criacao = new Date('2026-06-02').toLocaleDateString('pt-br');
      u1.status = true;
      this.list_usuarios.push(u1);

      let u2 = new Usuario();
      u2.id = 2;
      u2.nome = "Daniela";
      u2.cargo = "Funcionário";
      u2.usuario = "espindola.moreira";
      u2.data_criacao = new Date('2026-08-02').toLocaleDateString('pt-br');
      u2.status = false;
      this.list_usuarios.push(u2);
    }

    openEditar(){
        this.modalRef = this.modalService.open(UsuarioForm,{
          modalClass: 'modal-lg'
        });
    }
}
