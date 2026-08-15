import { Component, OnInit, signal } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Usuario } from '../../../../models/gestao-usuarios/usuario';
import { form, minLength, required } from '@angular/forms/signals';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-form',
  imports: [MdbFormsModule, ɵInternalFormsSharedModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})


export class UsuarioForm{
  usuario: Usuario | null = null;
  form!: FormGroup;
  
  constructor(
    public modalRef: MdbModalRef<UsuarioForm>,
    private fb: FormBuilder
  ){}

  isEditar():boolean
  {
    return !!this.usuario?.id;
  }

  onSubmit(e: Event)
  {
  
      
  }
}
