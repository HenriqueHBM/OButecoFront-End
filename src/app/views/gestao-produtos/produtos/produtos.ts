import Swal from 'sweetalert2';
import { Component, inject, signal } from '@angular/core';
import { ProdutoForm } from './produto-form/produto-form';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ProdutoTable } from './produto-table/produto-table';
import { Location } from '@angular/common';
import { Produto } from '../../../models/gestao-produtos/produto';
import { ProdutoService } from '../../../services/gestao_produtos/produto-service';

@Component({
  selector: 'app-produtos',
  imports: [],
  templateUrl: './produtos.html',
  styleUrl: './produtos.scss',
})
export class Produtos {
  private produtoService = inject(ProdutoService);
  modalRef: MdbModalRef<ProdutoForm> | null = null;
  list_produtos = signal<Produto[]>([]);

  constructor(
    private modalService: MdbModalService,
    private _location: Location
  ) {
    this.listarUsuarios();
  }

    listarUsuarios(){
      this.usuariosService.listAll().subscribe({
        next: lista => {
          this.list_produtos.set(lista);


        },

        error: erro =>{
          Swal.fire({
            icon: "error",
            title: "Conexão com o Banco",
            text: "Parece que a conexão com o banco foi perdia"
          })
        },
      });
    }
    openCadastrar(){
      this.modalRef = this.modalService.open(ProdutoForm, {
        modalClass: 'modal-lg'
      })
    }

    backCliked(){
      this._location.back();
    }

    openEditar(produto: Produto){
      this.modalRef = this.modalService.open(ProdutoForm, {
        modalClass: 'modal-lg' ,
        data: {
          produto: produto
        }
      });
    }

    changeStatus(produto: Produto){
      if (confirm(`Dejesa mesmo ${produto.status ? "Inativar" : "Ativar"} esse produto?`)){
        this.produtoService.changeStatus(produto.id).subscribe({
          next: sucesso => {
            alert("Sucesso na alteração");
            this.listarProdutos();
          },
          error: erro =>{
            alert("Erro")
          }
        });
      }
    }
    findById(id_desejado: number){
      let produto = null;
    }

    excluirProduto( produto : Produto){

    }
}
