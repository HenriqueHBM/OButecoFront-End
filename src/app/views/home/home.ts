import { Component, inject } from '@angular/core';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { Router } from '@angular/router';
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MdbFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
    private router = inject(Router);
  entrar() {
      this.router.navigate(['home/gestao_usuarios/usuarios']);
  }
}

