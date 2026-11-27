import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HttpErrorResponse } from '@angular/common/http';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProdutoService } from '../../../../services/gestao-produtos/produto-service';
import { GRUPO_LABELS, GrupoEnum } from '../../../../Enums/grupo-enum';
import { CATEGORIA_LABELS, CategoriaEnum } from '../../../../Enums/categoria-enum';
import { StatusEnum } from '../../../../Enums/status-enum';
import { Produto, ProdutoRequest } from '../../../../models/gestao-produtos/produto';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { numeroPositivo, paraNumero } from '../../../../utils/numero';

@Component({
  selector: 'app-produto-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss',
})
export class ProdutoForm implements OnInit {
  private produtoService = inject(ProdutoService);
  private destroyRef = inject(DestroyRef);
  protected readonly grupos = Object.values(GrupoEnum);
  protected readonly gruposLabels = GRUPO_LABELS;
  protected readonly categorias = Object.values(CategoriaEnum);
  protected readonly categoriasLabels = CATEGORIA_LABELS;

  produto: Produto | null = null;
  myForm!: FormGroup;

  // produtos da categoria INSUMO e ativos, que podem entrar na ficha técnica
  listaInsumos = signal<Produto[]>([]);
  erroInsumos = signal<string>('');

  constructor(
    public modalRef: MdbModalRef<ProdutoForm>,
    private fb: FormBuilder
  ) {

  }

  isEditar(): boolean {
    return !!this.produto?.id;
  }

  get insumos(): FormArray {
    return this.myForm.get('insumos') as FormArray;
  }

  ehProdutoComInsumos(): boolean {
    return this.myForm.get('categoriaEnum')?.value === CategoriaEnum.ProdutoInsumos;
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [this.produto?.id ?? null],
      nome: [this.produto?.name, Validators.required],
      categoriaEnum: [this.produto?.categoryEnum ?? null, Validators.required],
      grupoEnum: [this.produto?.groupEnum ?? null, Validators.required],
      // mostra o preço no formato brasileiro na edição (2.2 -> "2,2")
      precoVenda: [this.produto?.salePrice != null ? String(this.produto.salePrice).replace('.', ',') : null,
        [Validators.required, numeroPositivo()]],
      observacao: [this.produto?.observation],
      insumos: this.fb.array([])
    });

    // na edição, carrega os insumos que o produto já tem
    this.produto?.insumos?.forEach(item => this.adicionarInsumo(item.insumoId, item.qtde));

    // trocou para "Produto/Insumos": já abre uma linha; trocou para outra categoria: limpa a lista
    this.myForm.get('categoriaEnum')!.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(categoria => {
        this.erroInsumos.set('');
        if (categoria === CategoriaEnum.ProdutoInsumos) {
          if (this.insumos.length === 0) this.adicionarInsumo();
        } else {
          this.insumos.clear();
        }
      });

    this.carregarInsumos();
  }

  carregarInsumos() {
    this.produtoService.listAll().subscribe({
      next: lista => {
        this.listaInsumos.set(lista.filter(p =>
          p.categoryEnum === CategoriaEnum.Insumo
          && p.status === StatusEnum.ATIVO
          && p.id !== this.produto?.id
        ));
      },
      error: () => this.listaInsumos.set([])
    });
  }

  adicionarInsumo(insumoId: number | null = null, qtde: number | null = null) {
    this.insumos.push(this.fb.group({
      insumoId: [insumoId, Validators.required],
      qtde: [qtde, [Validators.required, Validators.min(0.01)]]
    }));
    this.erroInsumos.set('');
  }

  removerInsumo(index: number) {
    this.insumos.removeAt(index);
  }

  campoInvalido(campo: string): boolean {
    const controle = this.myForm.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  insumoInvalido(index: number, campo: string): boolean {
    const controle = this.insumos.at(index).get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  // valida as regras da ficha técnica antes de mandar para o back
  private validarInsumos(): boolean {
    if (!this.ehProdutoComInsumos()) return true;

    if (this.insumos.length === 0) {
      this.erroInsumos.set('Adicione ao menos um insumo para este produto.');
      return false;
    }

    const ids = this.insumos.controls.map(c => c.get('insumoId')!.value);
    if (new Set(ids).size !== ids.length) {
      this.erroInsumos.set('O mesmo insumo foi adicionado mais de uma vez.');
      return false;
    }

    this.erroInsumos.set('');
    return true;
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.myForm.invalid || !this.validarInsumos()) {
      this.myForm.markAllAsTouched();
      return;
    }

    const valor = this.myForm.value;
    const produto: ProdutoRequest = {
      id: valor.id,
      nome: valor.nome,
      categoriaEnum: valor.categoriaEnum,
      grupoEnum: valor.grupoEnum,
      precoVenda: paraNumero(valor.precoVenda),
      observacao: valor.observacao ?? null,
      insumos: this.ehProdutoComInsumos()
        ? valor.insumos.map((i: { insumoId: number; qtde: number }) => ({ insumoId: i.insumoId, qtde: Number(i.qtde) }))
        : []
    };

    const requisicao = produto.id == null
      ? this.produtoService.save(produto)
      : this.produtoService.updateProduto(produto);

    requisicao.subscribe({
      next: () => {
        Swal.fire({
          icon: "success",
          title: "Sucesso ao salvar"
        });
        this.modalRef.close();
      },
      error: (erro: HttpErrorResponse) => {
        if (erro.status === 401 || erro.status === 403) return;

        // o back devolve a mensagem do erro (ex.: "Insumo repetido na lista") como texto
        const mensagemBack = typeof erro.error === 'string' && erro.error.length < 200 ? erro.error : '';
        Swal.fire({
          icon: "info",
          title: "Erro ao salvar",
          text: mensagemBack || "Parece que não foi possível salvar as informações de produto"
        });
      }
    });
  }
}
