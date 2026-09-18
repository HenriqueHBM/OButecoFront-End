import { Component, inject, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/gestao_usuarios/usuario-service';
import { CARGOS_LABELS, CargosEnum } from '../../../../Enums/cargos-enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})


export class UsuarioForm implements OnInit {
  private usuarioService = inject(UsuarioService);
  protected readonly cargos = Object.values(CargosEnum);
  protected readonly cargosLabels = CARGOS_LABELS;

  usuario: Usuario | null = null;
  myForm!: FormGroup;

  constructor(
    public modalRef: MdbModalRef<UsuarioForm>,
    private fb: FormBuilder
  ) {
  }



  isEditar(): boolean {
    return !!this.usuario?.id;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [this.usuario?.id],
      nome: [this.usuario?.nome, Validators.required],
      cargoEnum: [this.usuario?.cargoEnum, Validators.required],
      usuario: [this.usuario?.usuario, Validators.required],
      senha: [null]
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const usuario: Usuario = this.myForm.value;

    // Cadastrar
    if(usuario.id == null){
      this.usuarioService.save(usuario).subscribe({
        next: sucesso => {
         Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          })

        },
        error: erro =>{
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível salvar as informações de usuário"
          });

        }
      });

      // Editar
    }else{
      this.usuarioService.updateUsuario(usuario).subscribe({
        next: sucesso => {
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          });
        },
        error: erro =>{
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível salvar as informações de usuário"
          });
        }
      });
    }

    this.modalRef.close();
  }
}
