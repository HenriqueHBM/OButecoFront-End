import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { Produto } from '../../../../models/gestao-produtos/produto';
import { StatusEnum } from '../../../../Enums/status-enum';

@Component({
  selector: 'app-produto-table',
  imports: [],
  templateUrl: './produto-table.html',
  styleUrl: './produto-table.scss',
})
export class ProdutoTable {
  protected readonly status = StatusEnum;
  produtos  = input<Produto[]>([]);

  formatarData(data: string): string {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  editar = output<Produto>();
  changeStatus = output<Produto>();
  excluir = output<Produto>();
  insumos = output<Produto>();
}
