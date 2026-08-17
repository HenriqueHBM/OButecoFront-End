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

  usuario: string = '';
  senha: string = '';

  private router = inject(Router);

  logar(){

    if (this.usuario == 'admin' && this.senha == 'admin') {
      this.router.navigate(['/admin/home']);
    } else {
      alert('Usuário ou senha estão incorretos');
    }
  }
}
