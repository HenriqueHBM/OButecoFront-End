import { Routes } from '@angular/router';
import { Login } from './views/login/login/login';
import { PrincipalComponent } from './views/principal/principal.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

// As telas internas usam lazy loading (loadComponent): cada uma só é baixada
// quando o usuário entra nela, deixando o carregamento inicial do app menor.
export const routes: Routes =
[
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: Login, canActivate:[guestGuard]},
  { path: 'home', component: PrincipalComponent, canActivate: [authGuard], canActivateChild: [authGuard],
    children: [
      // Home
      {path: '', loadComponent: () => import('./views/home/home').then(m => m.Home)},

      // Usuarios
      {path: 'gestao_usuarios/usuarios', loadComponent: () => import('./views/gestao-usuarios/usuarios/usuarios').then(m => m.Usuarios)},

      // Produtos
      {path: "gestao_produtos/produtos", loadComponent: () => import('./views/gestao-produtos/produtos/produtos').then(m => m.Produtos)},

      // Estoque
      {path: "gestao_estoques/estoques", loadComponent: () => import('./views/gestao-estoques/estoques/estoques').then(m => m.Estoques)}
    ]
  },
  // qualquer URL desconhecida volta para o início (hoje dá tela em branco)
  { path: '**', redirectTo: 'login' }
];