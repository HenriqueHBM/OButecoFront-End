import { Routes } from '@angular/router';
import { Login } from './views/login/login/login';
import { Usuarios } from './views/usuarios/usuarios/usuarios';
import { Home } from './views/home/home';

export const routes: Routes = [
    { path: '', redirectTo: "login", pathMatch: "full" },
    { path: "login", component: Login },
    { path: "home", component: Home},
    {
        path: "usuarios",
        component: Usuarios,
        // children: [
        //     {path: "usuarios/"}
        // ]
    }
];
