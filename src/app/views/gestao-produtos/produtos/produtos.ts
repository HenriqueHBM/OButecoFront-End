
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, computed, inject, signal } from '@angular/core';
import { ProdutoForm } from './produto-form/produto-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutoTable } from './produto-table/produto-table';
import { Location } from '@angular/common';
import { Produto } from '../../../models/gestao-produtos/produto';
import { ProdutoService } from '../../../services/gestao-produtos/produto-service';
import { StatusEnum } from '../../../Enums/status-enum';
import { AuthService } from '../../../services/auth/auth-service';
import { CargosEnum } from '../../../Enums/cargos-enum';

@Component({
  selector: 'app-produtos',
  imports: [ProdutoTable],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos {
  protected auth = inject(AuthService);
  protected readonly cargos = CargosEnum;

  private produtoService = inject(ProdutoService);
  modalRef: MdbModalRef<ProdutoForm> | null = null;
  list_produtos = signal<Produto[]>([]);

  produtos_ativos = computed(() => this.list_produtos().filter(i => i.status == StatusEnum.ATIVO).length);
  produtos_inativos = computed(() => this.list_produtos().filter(i => i.status == StatusEnum.INATIVO).length);

  constructor(
    private modalService: MdbModalService,
    private _location: Location
  ) {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listAll().subscribe({
      next: (lista: Produto[]) => {
        this.list_produtos.set(lista);
      },

      error: (erro: HttpErrorResponse) => {
        if (erro.status === 401 || erro.status === 403) return;

        Swal.fire({
          icon: "error",
          title: "Conexão com o Banco",
          text: "Parece que a conexão com o banco foi perdia"
        });
      },
    });
  }

  openCadastrar() {
    this.modalRef = this.modalService.open(ProdutoForm, {
      modalClass: 'modal-lg'
    });
    //atualiza a listagem quando fechado o modal
    this.modalRef.onClose.subscribe(() => this.listarProdutos());
  }

  backCliked() {
    this._location.back();
  }

  openEditar(produto: Produto) {
    this.modalRef = this.modalService.open(ProdutoForm, {
      modalClass: 'modal-lg',
      data: {
        produto: produto
      }
    });
    //atualiza a listagem quando fechado o modal
    this.modalRef.onClose.subscribe(() => this.listarProdutos());
  }

  changeStatus(produto: Produto) {
    Swal.fire({
      icon: "warning",
      title: `Deseja mesmo ${produto.status == StatusEnum.ATIVO ? "Inativar" : "Ativar"} esse produto?`,
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar"
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.produtoService.changeStatus(produto.id).subscribe({
          next: (sucesso: string) => {
            Swal.fire({
              icon: "success",
              title: "Sucesso na alteração"
            });
            this.listarProdutos();
          },
          error: (erro: HttpErrorResponse) => {
            if (erro.status === 401 || erro.status === 403) return;

            Swal.fire({
              icon: "info",
              title: "Erro ao salvar",
              text: "Parece que não foi possível alterar o status do produto"
            });
          }
        });
      }
    });
  }

  findById(id_desejado: number) {
    let produto = null;
  }

  excluirProduto(produto: Produto) {
    Swal.fire({
      icon: "warning",
      title: "Deseja mesmo excluir esse produto?",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Cancelar"
    }).then(resultado => {
      if (resultado.isConfirmed) {
        this.produtoService.deleteProduto(produto.id).subscribe({
          next: sucesso => {
            Swal.fire({
              icon: "success",
              title: "Sucesso ao excluir"
            });
            this.listarProdutos();
          },
          error: (erro: HttpErrorResponse) => {
            if (erro.status === 401 || erro.status === 403) return;

            Swal.fire({
              icon: "info",
              title: "Erro ao excluir",
              text: "Parece que não foi possível excluir o produto"
            });
          }
        });
      }
    });
  }

  showInsumos(produto: Produto) {

  }
}
