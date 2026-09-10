import Swal from 'sweetalert2'
import { Component, inject, signal } from '@angular/core';
import { UsuarioForm } from './usuario-form/usuario-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioTable } from './usuario-table/usuario-table';
import { Location } from '@angular/common';
import { Usuario } from '../../../models/gestao-usuarios/usuario';
import { UsuarioService } from '../../../services/gestao_usuarios/usuario-service';

@Component({
  selector: 'app-usuarios',
  imports: [UsuarioTable],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})

export class Usuarios {
  private usuarioService = inject(UsuarioService);
  modalRef: MdbModalRef<UsuarioForm> | null = null;
  // Utiliznado o signal para escutar as chamadas assincronas do observable 
  // (aplicação roda em zonles depois da v18 do Angular)
  list_usuarios = signal<Usuario[]>([]);

  constructor(
    private modalService: MdbModalService,
    private _location: Location
  ) { 
    this.listarUsuarios();
  }

    listarUsuarios(){
    this.usuarioService.listAll().subscribe({
      // Quando o back retornoa o que se espera
        next: lista => {
            // this.list_usuarios = lista;
            this.list_usuarios.set(lista);
            
            
        },
        // qualquer erro no banco retorna aqui
        error: erro =>{
            Swal.fire({
              icon: "error",
              title: "Conexão com o Banco",
              text: "Parece que a conexão com o banco foi perdida"
            })
        },
    });
  }

  openCadastrar() {
    this.modalRef = this.modalService.open(UsuarioForm, {
      modalClass: 'modal-lg'
    })
  }

  backCliked(){
    this._location.back();
  }

  openEditar(usuario: Usuario) {  
    this.modalRef = this.modalService.open(UsuarioForm, {
      modalClass: 'modal-lg',
      data: {
        usuario: usuario
      }
    });
  }

  changeStatus(usuario: Usuario) {
    if (confirm(`Deseja mesmo ${usuario.status ? "Inativar" : "Ativar"} eses usuário?`)) {
      this.usuarioService.changeStatus(usuario.id).subscribe({
        next: sucesso => {
            alert("Sucesso na alteracao");
            this.listarUsuarios();
        },
        error: erro =>{
          alert("Erro")
        } 
      });
    }
  }

  findById(id_desejado:number){
    let usuario = null;
    // this.list_usuarios.forEach((value, index) => {
    //     if(value.id == id_desejado){
    //       usuario = value;
    //     }
    //   })

    //   return usuario;
      
  }

  excluirUsuario(usuario: Usuario){

  }
}
