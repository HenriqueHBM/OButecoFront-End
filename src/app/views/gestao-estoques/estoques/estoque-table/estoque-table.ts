import { Component, inject, input, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { Estoque } from '../../../../models/gestao-estoque/estoque';
import { StatusEnum } from '../../../../Enums/status-enum';
import { MovimentacaoTable } from '../../movimentacoes/movimentacao-table/movimentacao-table';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-estoque-table',
  imports: [],
  templateUrl: './estoque-table.html',
  styleUrl: './estoque-table.scss',
})
export class EstoqueTable {
  protected readonly status = StatusEnum;
  // modalRef: MdbModalRef<any> | null = null;

  modalService = inject(MdbModalService);
  @ViewChild('modalMovimentacoes') modalMovimentacoes !: TemplateRef<any>;
  modalRef !:MdbModalRef<any>;

  estoques = input<Estoque[]>([]);

  movimentacoes = output<Estoque>();
  entrada = output<Estoque>();
  saida = output<Estoque>();
  mov = output<Estoque>();

  idEstoqueSelecionado = signal<number>(0);

  constructor(
  ){

  }

  openMovimentacoes(estoque: Estoque){
    this.idEstoqueSelecionado.set(estoque.id);
    this.modalRef = this.modalService.open(this.modalMovimentacoes,{
      modalClass: 'modal-xl'
    });
  }

  retornoMovimentacoes(estoque: Estoque){
    // this.modalRef = this.modalService.open(this.modalMovimentacoes);
  }
}
