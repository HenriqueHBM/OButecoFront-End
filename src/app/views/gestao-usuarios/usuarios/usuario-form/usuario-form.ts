import { Component, signal } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

interface UsuarioData {
  nome:    string;
  usuario: string;
  cargo:   string;
}

const usuarioFor = signal<UsuarioData>({
    nome: '',
    usuario: '',
    cargo: ''
});

@Component({
  selector: 'app-usuario-form',
  imports: [MdbFormsModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})


export class UsuarioForm {
  constructor(public modalRef: MdbModalRef<UsuarioForm>){}

  isCadastrar = false;
}
