import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth-service';
import { Auth } from '../../../models/auth/auth';

@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private loginService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mostrarSenha = signal(false);

  myForm = inject(FormBuilder).nonNullable.group({
    usuario: ['', Validators.required],
    senha: ['', Validators.required]
  });

  campoInvalido(campo: string): boolean {
    const controle = this.myForm.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  logar(e: Event) {
    e.preventDefault();

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const { usuario, senha }: Auth = this.myForm.getRawValue();
    this.loginService.login(usuario, senha).subscribe({
      next: () => {
        const destino = this.route.snapshot.queryParamMap.get('returnUrl');
         this.router.navigateByUrl(destino?.startsWith('/home') ? destino : '/home');
      },
      error: (err: HttpErrorResponse) => {
        Swal.fire({
          icon: "error",
          title: "Não foi possível entrar",
          text: err.status === 401
            ? "Usuário ou senha inválidos"
            : "Erro ao conectar com o servidor. Tente novamente."
        });
      }
    });
  }
}
