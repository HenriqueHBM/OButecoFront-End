import Swal from 'sweetalert2';
import { Component, computed, inject, signal } from '@angular/core';
import { ProdutoForm } from './produto-form/produto-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutoTable } from './produto-table/produto-table';
import { Location } from '@angular/common';
import { Produto } from '../../../models/gestao-produtos/produto';
import { ProdutoService } from '../../../services/gestao-produtos/produto-service';
import { StatusEnum } from '../../../Enums/status-enum';

@Component({
  selector: 'app-produtos',
  imports: [ProdutoTable],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos {
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

      error: (erro: unknown) => {
        Swal.fire({
          icon: "error",
          title: "Conexão com o Banco",
          text: "Parece que a conexão com o banco foi perdia"
        })
      },
    });
  }
  openCadastrar() {
    this.modalRef = this.modalService.open(ProdutoForm, {
      modalClass: 'modal-lg'
    })
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
  }

  changeStatus(produto: Produto) {
    if (confirm(`Dejesa mesmo ${produto.status ? "Inativar" : "Ativar"} esse produto?`)) {
      this.produtoService.changeStatus(produto.id).subscribe({
        next: (sucesso: string) => {
          alert("Sucesso na alteração");
          this.listarProdutos();
        },
        error: (erro: unknown) => {
          alert("Erro")
        }
      });
    }
  }
  findById(id_desejado: number) {
    let produto = null;
  }

  excluirProduto(produto: Produto) {
    if (confirm("Deseja mesmo excluir esse produto?")) {
      this.produtoService.deleteProduto(produto.id).subscribe({
        next: sucesso => {
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          });
        },
        error: erro => {
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível salvar as informações de produto"
          })

        }
      })
    }
    this.listarProdutos();
  }

  showInsumos(produto: Produto) {

  }
}
