import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ProdutoService } from '../../../../services/gestao-produtos/produto-service';
import { CategoriaService } from '../../../../services/gestao-produtos/categoria-service';
import { Produto } from '../../../../models/gestao-produtos/produto';
import { Categoria } from '../../../../models/gestao-produtos/categoria';
import { Grupo } from '../../../../models/gestao-produtos/grupo';
import { GrupoService } from '../../../../services/gestao-produtos/grupo-service';

@Component({
  selector: 'app-produto-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss',
})
export class ProdutoForm implements OnInit{
  private produtoService = inject(ProdutoService);
  private categoriaService = inject(CategoriaService);
  protected readonly categorias = Object.values(CategoriaEnum);
  private grupoService = inject(GrupoService);
  protected readonly grupos = Object.values(GrupoEnum);

  produto: Produto | null = null;
  myForm! : FormGroup;
  list_categoria = signal<Categoria[]>([]);
  list_grupo = signal<Grupo[]>([]);

  constructor(
    public modalRef: MdbModalRef<ProdutoForm>,
    private fb: FormBuilder
  ){
  }

  isEditar(): boolean {
    return !!this.produto?.id
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      id: [this.produto?.id],
      nome: [this.produto?.nome, Validators.required],
      grupoId: [this.produto?.grupo, Validators.required],
      categoria: [this.produto?.categoria, Validators.required]
    })
  }
}
