import { Routes } from '@angular/router';
import { Login } from './views/login/login/login';
import { Home } from './views/home/home';
import { Usuarios } from './views/gestao-usuarios/usuarios/usuarios';
import { PrincipalComponent } from './views/principal/principal.component';
import { Cargos } from './views/gestao-usuarios/cargos/cargos';

export const routes: Routes =
[
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: Login},
  { path: 'home', component: PrincipalComponent, 
    children: [
      {path: 'gestao_usuarios/usuarios', component: Usuarios},
      {path: 'gestao_usuarios/cargos', component: Cargos}
    ]
  }
];

