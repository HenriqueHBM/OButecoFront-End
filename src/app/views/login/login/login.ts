import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  private router = inject(Router);

  usuario: string = '';
  senha: string = '';

  logar() {
    const dados = localStorage.getItem('lista_usuarios');

    if (!dados) {
      alert('Nenhum usuário cadastrado');
      return;
    }

    const lista = JSON.parse(dados);

    const encontrado = lista.find((usuario: any) => {
      return usuario.usuario === this.usuario && usuario.senha === this.senha;
    });

    if (encontrado) {
      this.router.navigate(['/home']);
    } else {
      alert('Usuário ou senha estão incorretos');
    }
  }
}
