import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Movimentacoes } from '../../../../models/gestao-estoque/movimentacoes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estoque } from '../../../../models/gestao-estoque/estoque';
import { EstoqueService } from '../../../../services/gestao-estoques/estoque-service';
import { MovimentacaoService } from '../../../../services/gestao-estoques/movimentacao-service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-movimentacao-form',
  imports: [MdbFormsModule, ReactiveFormsModule],
  templateUrl: './movimentacao-form.html',
  styleUrl: './movimentacao-form.scss',
})
export class MovimentacaoForm implements OnInit {
  private estoquesService = inject(EstoqueService);
  private movimentacaoService = inject(MovimentacaoService);

  myForm!: FormGroup;
  idEstoque = input<number>(0);
  retorno = output<Movimentacoes>();

  estoque = signal<Estoque>(new Estoque());

  constructor(
    private fb: FormBuilder,
  ) { }

  setarEstoque() {
    this.estoquesService.findById(this.idEstoque()).subscribe({
      next: estoqueBack => {
        this.estoque.set(estoqueBack);
        // a resposta chega depois do form já montado, entao preenchemos aqui
        this.myForm.patchValue({
          fk_id_produto: estoqueBack.fk_id_produto,
          local: estoqueBack.local,
          fk_id_usuario: 1, //setado 1 pois não temos usuario logado ainda 
          fk_id_estoque: estoqueBack.id
        });
      },
      error: erro => {
        console.log(erro);

        Swal.fire({
          icon: "error",
          title: "Conexão com o Banco",
          text: "Parece que a não foi possível encontrar esse estoque"
        })
      }
    })
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      fk_id_produto: [this.estoque().fk_id_produto, Validators.required],
      local: [this.estoque().local, Validators.required],
      fk_id_usuario: [1, Validators.required],
      fk_id_estoque: [this.estoque().id, Validators.required],
      tipo: [null, Validators.required],
      qtde: [null, Validators.required],
      valorUnitario: [null, Validators.required],
      fk_id_conversao: [null, Validators.required],
      taxaConversao: [],
      observacao: []
    });

    this.setarEstoque();
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const movimentacao: Movimentacoes = this.myForm.value;

    if (movimentacao.tipo == 'TIPO_ENTRADA') {
      this.movimentacaoService.saveEntrada(movimentacao).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          });
          this.retorno.emit(movimentacao);
        },
        error: erro => {
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível salvar a movimentação"
          });
        }
      });
    } else {
      this.movimentacaoService.saveSaida(movimentacao).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          });
          this.retorno.emit(movimentacao);
        },
        error: erro => {
          Swal.fire({
            icon: "info",
            title: "Erro ao salvar",
            text: "Parece que não foi possível salvar a movimentação"
          });
        }
      });
    }

  }
}
