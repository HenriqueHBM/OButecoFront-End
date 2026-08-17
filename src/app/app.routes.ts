import { Routes } from '@angular/router';
import { Login } from './views/login/login/login';
import { Home } from './views/home/home';
import { Usuarios } from './views/gestao-usuarios/usuarios/usuarios';
import { PrincipalComponent } from './views/principal/principal.component';

export const routes: Routes =
[
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: Login},
  { path: 'admin', component: PrincipalComponent,children:
    [
      {path: 'home', component: Home},
      {path: 'usuarios', component: Usuarios}

    ]
  }
];

