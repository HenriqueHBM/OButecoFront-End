import { Component } from '@angular/core';
import { UsuarioForm } from './usuario-form/usuario-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioTable } from './usuario-table/usuario-table';
import { Location } from '@angular/common';
import { Usuario } from '../../../models/gestao-usuarios/usuario';

@Component({
  selector: 'app-usuarios',
  imports: [UsuarioTable],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})

export class Usuarios {
    modalRef: MdbModalRef<UsuarioForm> | null = null;

    //criando uma lista para salvar na storaga
    lista_usuarios: Usuario[] = [
      {id: 1, nome: "Henrique", usuario: 'henrique.madeira',  senha: "senha", cargo: "Admin", data_criacao: new Date('2026-06-02').toLocaleDateString('pt-br'), status: true},
      {id: 2, nome: "Daniella", usuario: 'daniella.moreira',  senha: "senha", cargo: "Líder", data_criacao: new Date('2026-06-02').toLocaleDateString('pt-br'), status: false},
      {id: 3, nome: "Jonas",    usuario: 'jonas.lacerda',     senha: "senha", cargo: "Gerente", data_criacao: new Date('2026-06-02').toLocaleDateString('pt-br'), status: true}
    ];

  constructor(
    private modalService: MdbModalService,
    private _location: Location
  ) { 
    
    //salvando a lista na storage
    // localStorage.setItem("lista_usuarios", JSON.stringify(this.lista_usuarios))
  }

  openCadastrar() {
    this.modalRef = this.modalService.open(UsuarioForm, {
      modalClass: 'modal-lg'
    })
  }

  backCliked(){
    this._location.back();
  }
}
