import { Component, inject, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProdutoService } from '../../../../services/gestao-produtos/produto-service';
import { GRUPO_LABELS, GrupoEnum } from '../../../../Enums/grupo-enum';
import { CATEGORIA_LABELS, CategoriaEnum } from '../../../../Enums/categoria-enum';
import { Produto } from '../../../../models/gestao-produtos/produto';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-produto-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss',
})
export class ProdutoForm implements OnInit {
  private produtoService = inject(ProdutoService);
  protected readonly grupos = Object.values(GrupoEnum);
  protected readonly gruposLabels = GRUPO_LABELS;
  protected readonly categorias = Object.values(CategoriaEnum);
  protected readonly categoriasLabels = CATEGORIA_LABELS;

  produto: Produto | null = null;
  myForm!: FormGroup;

  constructor(
    public modalRef: MdbModalRef<ProdutoForm>,
    private fb: FormBuilder
  ) {

  }

  isEditar(): boolean {
    return !!this.produto?.id;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [this.produto?.id,],
      nome: [this.produto?.nome, Validators.required],
      categoriaEnum: [this.produto?.categoriaEnum, Validators.required],
      grupoEnum: [this.produto?.grupoEnum, Validators.required],
      precoVenda: [this.produto?.precoVenda, Validators.required],
      observacao: [this.produto?.observacao],
      // insumos: [[]]
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

    const produto: Produto = this.myForm.value;

    if (produto.id == null) {
      this.produtoService.save(produto).subscribe({
        next: sucesso => {
          // alert("sucesso ao salvar");
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          })

        },
        error: erro => {
          // alert("Erro ao salvar");
          // console.log(erro);
          
            Swal.fire({
              icon: "info",
              title: "Erro ao salvar",
              text: "Parece que não foi possível salvar as informações de produto"
            })
        }
      })
    } else {
        this.produtoService.updateProduto(produto).subscribe({
          next: sucesso => {
            Swal.fire({
              icon: "success",
              title: "Sucesso ao salvar"
            });
          },
          error: erro =>{
            Swal.fire({
              icon: "info",
              title: "Erro ao salvar",
              text: "Parece que não foi possível salvar as informações de produto"
            });

          }
        })
    }
    this.modalRef.close();
  }
}
