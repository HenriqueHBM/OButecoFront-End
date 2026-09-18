import Swal from 'sweetalert2';
import { Component, computed, inject, signal } from '@angular/core';
import { UsuarioForm } from './usuario-form/usuario-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { UsuarioTable } from './usuario-table/usuario-table';
import { Location } from '@angular/common';
import { Usuario } from '../../../models/gestao-usuarios/usuario';
import { UsuarioService } from '../../../services/gestao_usuarios/usuario-service';
import { StatusEnum } from '../../../Enums/status-enum';

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
  usuarios_ativos = computed(() => this.list_usuarios().filter(i => i.status == StatusEnum.ATIVO).length);
  usuarios_inativos = computed(() => this.list_usuarios().filter(i => i.status == StatusEnum.INATIVO).length);

  constructor(
    private modalService: MdbModalService,
    private _location: Location
  ) {
    this.listarUsuarios();
  }

  listarUsuarios() {
    this.usuarioService.listAll().subscribe({
      // Quando o back retornoa o que se espera
      next: lista => {
        // this.list_usuarios = lista;
        this.list_usuarios.set(lista);


      },
      // qualquer erro no banco retorna aqui
      error: erro => {
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

  backCliked() {
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
    if (confirm(`Deseja mesmo ${usuario.status ? "Inativar" : "Ativar"} esse usuário?`)) {
      this.usuarioService.changeStatus(usuario.id).subscribe({
        next: sucesso => {
          Swal.fire({
              icon: "success",
              title: "Sucesso ao salvar"
            });
          this.listarUsuarios();
        },
        error: erro => {
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível salvar as informações de produto"
          });
        }
      });
    }
  }

  findById(id_desejado: number) {
    let usuario = null;
    // this.list_usuarios.forEach((value, index) => {
    //     if(value.id == id_desejado){
    //       usuario = value;
    //     }
    //   })

    //   return usuario;

  }

  excluirUsuario(usuario: Usuario) {
    if (confirm("Deseja mesmo excluir esse usuário?")) {
      this.usuarioService.deleteUsuario(usuario.id).subscribe({
        next: sucesso => {
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          });
        },
        error: erro => {
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível excluir o usuáiro"
          })

        }
      })
    }
    this.listarUsuarios();
  }
}
