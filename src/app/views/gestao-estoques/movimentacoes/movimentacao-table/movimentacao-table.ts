import { Component, effect, inject, input, output, signal } from '@angular/core';
import { Movimentacoes } from '../../../../models/gestao-estoque/movimentacoes';
import { MovimentacaoService } from '../../../../services/gestao-estoques/movimentacao-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimentacao-table',
  imports: [],
  templateUrl: './movimentacao-table.html',
  styleUrl: './movimentacao-table.scss',
})
export class MovimentacaoTable {
  retorno = output<any>();
  idEstoque = input<number>(0);

  private movimentacoes = inject(MovimentacaoService);

  list_movimentacoes = signal<Movimentacoes[]>([]);

  formatarData(data: string): string {
    const date = new Date(data);
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  constructor(

  ) {
    effect(() => {
      this.listarEstoqueMovimentacoes(this.idEstoque());
    });
  }

  listarEstoqueMovimentacoes(idEstoque: number) {
    this.movimentacoes.listAllByIdEstoque(idEstoque).subscribe({
      // Quando o back retornoa o que se espera
      next: lista => {
        // this.list_usuarios = lista;
        this.list_movimentacoes.set(lista);


      },
      // qualquer erro no banco retorna aqui
      error: erro => {
        Swal.fire({
          icon: "error",
          title: "Conexão com o Banco",
          text: "Parece que a conexão com o banco foi perdida"
        })
      },
    });
  }


}
