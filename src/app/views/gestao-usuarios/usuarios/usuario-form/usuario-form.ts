import { Component, inject, OnInit, signal } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../../../services/gestao_usuarios/usuario-service';
import { CargosService } from '../../../../services/gestao_usuarios/cargos-service';
import { Cargo } from '../../../../models/gestao-usuarios/cargo';

@Component({
  selector: 'app-usuario-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})


export class UsuarioForm implements OnInit {
  private usuarioService = inject(UsuarioService);
  private cargoService = inject(CargosService);

  usuario: Usuario | null = null;
  myForm!: FormGroup;
  // cargos: Cargo[] = [];
  list_cargos = signal<Cargo[]>([]);

  constructor(
    public modalRef: MdbModalRef<UsuarioForm>,
    private fb: FormBuilder
  ) {
    this.listarCargos()
  }

  listarCargos(){
    this.cargoService.listAll().subscribe({
      // Quando o back retornoa o que se espera
        next: lista => {
            // this.list_usuarios = lista;
            this.list_cargos.set(lista);
            console.log(lista);
            
            
        },
        // qualquer erro no banco retorna aqui
        error: erro =>{
            alert('Erro no banco');
        },
    });
  }

  isEditar(): boolean {
    return !!this.usuario?.id;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [this.usuario?.id],
      nome: [this.usuario?.nome, Validators.required],
      cargoId: [this.usuario?.cargo, Validators.required],
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
          alert("sucesso ao salvar");

        },
        error: erro =>{
          alert("Erro ao salvar");

        }
      });
      // usuario.id = this.listarUsuarios().length + 1;
      // usuario.created_at = new Date().toLocaleDateString('pt-br');
      // usuario.status = true;
      // this.addNaLista(usuario)


      // Editar
    }else{
      // alert("entrei")
      this.usuarioService.updateUsuario(usuario).subscribe({
        next: sucesso => {
          alert("sucesso ao salvar");
          console.log(sucesso);
          

        },
        error: erro =>{
          alert("Erro ao salvar");

        }
      });;
      // let lista = this.listarUsuarios();
      // lista.forEach((element: Usuario, idx: number) => {
      //     if(element.id == usuario.id){
      //         usuario.status = element.status;
      //         usuario.created_at = element.created_at;
      //         lista.splice(idx, 1);
      //     }
      // });

      // let user = lista[usuario.id - 1];
      // lista.splice(usuario.id - 1, 1);
      
      // lista.push(usuario);
      // this.addNaLista(usuario);
      // this.updateLista(lista);

    }

    this.modalRef.close();
    window.location.reload();
  }

  listarUsuarios(){
    return JSON.parse(localStorage.getItem("lista_usuarios") ?? "[]");
  }

  addNaLista(usuario: Usuario){
    // let list_usuarios = this.listarUsuarios();
    // list_usuarios.push(usuario);
    // localStorage.setItem("lista_usuarios", JSON.stringify(list_usuarios));

  }

  updateLista(new_lista: []){
    // localStorage.setItem("lista_usuarios", JSON.stringify(new_lista));
  }
}
