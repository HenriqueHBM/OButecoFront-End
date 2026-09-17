import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Produto } from '../../../../models/gestao-produtos/produto';

@Component({
  selector: 'app-produto-table',
  imports: [],
  templateUrl: './produto-table.html',
  styleUrl: './produto-table.scss',
})
export class ProdutoTable {
  produtos  = input<Produto[]>([]);
  
  editar = output<Produto>();
  changeStatus = output<Produto>();
  excluir = output<Produto>();
}
