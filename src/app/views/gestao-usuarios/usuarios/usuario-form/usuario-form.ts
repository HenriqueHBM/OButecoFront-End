import { Component, OnInit, signal } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})


export class UsuarioForm implements OnInit {
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
      cargo: [this.usuario?.cargo, Validators.required],
      usuario: [this.usuario?.usuario, Validators.required],
      senha: [null]
    });
  }

  onSubmit(e: Event) {
    // e.preventDefault();
    const usuario: Usuario = this.myForm.value;

    // console.log(usuario);
    if(usuario.id == null){
      usuario.id = this.listarUsuarios().length + 1;
      usuario.data_criacao = new Date().toLocaleDateString('pt-br');
      usuario.status = true;
      this.addNaLista(usuario)
    }else{
      let lista = this.listarUsuarios();
      lista.forEach((element: Usuario, idx: number) => {
          if(element.id == usuario.id){
              usuario.status = element.status;
              usuario.data_criacao = element.data_criacao;
              lista.splice(idx, 1);
          }
      });

      // let user = lista[usuario.id - 1];
      // lista.splice(usuario.id - 1, 1);
      
      lista.push(usuario);
      // this.addNaLista(usuario);
      this.updateLista(lista);

    }

    this.modalRef.close();
    window.location.reload();
  }

  listarUsuarios(){
    return JSON.parse(localStorage.getItem("lista_usuarios") ?? "[]");
  }

  addNaLista(usuario: Usuario){
    let list_usuarios = this.listarUsuarios();
    list_usuarios.push(usuario);
    localStorage.setItem("lista_usuarios", JSON.stringify(list_usuarios));

  }

  updateLista(new_lista: []){
    localStorage.setItem("lista_usuarios", JSON.stringify(new_lista));
  }
}
