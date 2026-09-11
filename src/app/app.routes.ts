import { Routes } from '@angular/router';
import { Login } from './views/login/login/login';
import { Usuarios } from './views/gestao-usuarios/usuarios/usuarios';
import { PrincipalComponent } from './views/principal/principal.component';
import { Cargos } from './views/gestao-usuarios/cargos/cargos';
import { Produtos } from './views/gestao-produtos/produtos/produtos';
import { Estoques } from './views/gestao-estoques/estoques/estoques';

export const routes: Routes =
[
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: Login},
  { path: 'home', component: PrincipalComponent, 
    children: [
      // Usuarios
      {path: 'gestao_usuarios/usuarios', component: Usuarios},
      {path: 'gestao_usuarios/cargos', component: Cargos},

      // Produtos
      {path: "gestao_produtos/produtos", component: Produtos},

      // Estoque
      {path: "gestao_estoques/estoques", component: Estoques}
    ]
  }
];

