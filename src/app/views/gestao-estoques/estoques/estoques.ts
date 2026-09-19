import { Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { EstoqueService } from '../../../services/gestao-estoques/estoque-service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EstoqueForm } from './estoque-form/estoque-form';
import Swal from 'sweetalert2';
import { Estoque } from '../../../models/gestao-estoque/estoque';
import { Location } from '@angular/common';
import { EstoqueTable } from './estoque-table/estoque-table';
import { MovimentacaoTable } from '../movimentacoes/movimentacao-table/movimentacao-table';
import { MovimentacaoForm } from '../movimentacoes/movimentacao-form/movimentacao-form';

@Component({
  selector: 'app-estoques',
  imports: [EstoqueTable, MovimentacaoTable, MovimentacaoForm],
  templateUrl: './estoques.html',
  styleUrl: './estoques.scss',
})
export class Estoques {
  private estoquesService = inject(EstoqueService);
  // modalRef: MdbModalRef<EstoqueForm> | null = null;

  modalService = inject(MdbModalService);
  @ViewChild('modalMovimentacoes') modalMovimentacoes !: TemplateRef<any>;
  @ViewChild('modalCadastrarMovimentacao') modalCadastrarMovimentacao !: TemplateRef<any>;

  modalRef !: MdbModalRef<any>;
  idEstoqueSelecionado = signal<number>(0);

  list_estoques = signal<Estoque[]>([]);

  constructor(
    // private modalService: MdbModalService,
    private _location: Location
  ) {
    this.listarEstoques();
  }

  listarEstoques() {
    this.estoquesService.listAll().subscribe({
      // Quando o back retornoa o que se espera
      next: lista => {
        // this.list_usuarios = lista;
        this.list_estoques.set(lista);


      },
      // qualquer erro no banco retorna aqui
      error: erro => {
        console.log(erro);

        Swal.fire({
          icon: "error",
          title: "Conexão com o Banco",
          text: "Parece que a conexão com o banco foi perdida"
        })
      },
    });
  }

  openCadastrar() {
    this.modalRef = this.modalService.open(EstoqueForm, {
      modalClass: 'modal-lg'
    });
    //atualiza a listagem quando fechado o modal
    this.modalRef.onClose.subscribe(() => this.listarEstoques());
  }

  backCliked() {
    this._location.back();
  }

  // openMovimentacoes(estoque: Estoque) {
  //   this.modalRef = this.modalService.open(EstoqueForm, {
  //     modalClass: 'modal-lg',
  //     data: {
  //       estoque: estoque
  //     }
  //   });
  //   //atualiza a listagem quando fechado o modal
  //   this.modalRef.onClose.subscribe(() => this.listarEstoques());
  // }

  openMovimentacoes(estoque: Estoque){
    this.idEstoqueSelecionado.set(estoque.id);
    this.modalRef = this.modalService.open(this.modalMovimentacoes,{
      modalClass: 'modal-xl'
    });
  }

  openCadastrarMovimentacao(estoque: Estoque){
    this.idEstoqueSelecionado.set(estoque.id);
    this.modalRef = this.modalService.open(this.modalCadastrarMovimentacao,{
      modalClass: 'modal-xl'
    });
  }

  retornoMovimentacoes(estoque: Estoque){
    // this.modalRef = this.modalService.open(this.modalMovimentacoes);
  }

  retornoCadastrarMovimentacao(){
    this.modalRef.close();
    this.listarEstoques();
  }
}
