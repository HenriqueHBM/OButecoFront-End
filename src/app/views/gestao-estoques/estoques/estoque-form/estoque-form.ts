import { Component, inject, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EstoqueService } from '../../../../services/gestao-estoques/estoque-service';
import { ProdutoService } from '../../../../services/gestao-produtos/produto-service';
import { Produto } from '../../../../models/gestao-produtos/produto';
import { Estoque } from '../../../../models/gestao-estoque/estoque';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estoque-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './estoque-form.html',
  styleUrl: './estoque-form.scss',
})
export class EstoqueForm implements OnInit {
  private estoqueService = inject(EstoqueService);
  private produtoService = inject(ProdutoService);

  list_produtos: Produto[] = [];
  myForm!: FormGroup;

  constructor(
    public modalRef: MdbModalRef<EstoqueForm>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fk_id_produto: [null, Validators.required],
      qtdeEstoque: [null, [Validators.required, Validators.min(0.01)]],
      fk_id_conversao: [null, Validators.required],
      local: []
    });

    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listAll().subscribe({
      next: lista => {
        this.list_produtos = lista;
      },
      error: erro => {
        Swal.fire({
          icon: "error",
          title: "Conexão com o Banco",
          text: "Parece que não foi possível carregar os produtos"
        });
      }
    });
  }

  campoInvalido(campo: string): boolean {
    const controle = this.myForm.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const estoque: Estoque = this.myForm.value;

    this.estoqueService.save(estoque).subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sucesso ao salvar"
        });
      },
      error: erro => {
        Swal.fire({
          icon: "info",
          title: "Erro ao salvar",
          text: "Parece que não foi possível salvar o estoque"
        });
      }
    });

    this.modalRef.close();
  }
}
