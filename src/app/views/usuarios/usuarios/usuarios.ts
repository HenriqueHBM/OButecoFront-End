import { Component } from '@angular/core';
import { TabelaUsuario } from './components/tabela-usuario/tabela-usuario';
import { Usuario } from '../../../models/usuarios/usuario';


@Component({
  selector: 'app-usuarios',
  imports: [TabelaUsuario],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})
export class Usuarios {

}
