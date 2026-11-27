import { Component, inject, input, OnInit, output, signal } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MovimentacaoRequest } from '../../../../models/gestao-estoque/movimentacoes';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Estoque } from '../../../../models/gestao-estoque/estoque';
import { EstoqueService } from '../../../../services/gestao-estoques/estoque-service';
import { MovimentacaoService } from '../../../../services/gestao-estoques/movimentacao-service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { numeroPositivo, numeroValido, paraNumero } from '../../../../utils/numero';

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
  retorno = output<MovimentacaoRequest>();

  estoque = signal<Estoque>(new Estoque());

  constructor(
    private fb: FormBuilder,
  ) { }

  setarEstoque() {
    this.estoquesService.findById(this.idEstoque()).subscribe({
      next: estoqueBack => {
        this.estoque.set(estoqueBack);
        // a resposta chega depois do form já montado, entao preenchemos aqui
        // o usuário não é mais enviado: o back identifica pelo token
        this.myForm.patchValue({
          fk_id_produto: estoqueBack.fk_id_product,
          local: estoqueBack.local,
          fk_id_estoque: estoqueBack.id
        });
      },
      error: erro => {

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
      fk_id_produto: [this.estoque().fk_id_product, Validators.required],
      local: [this.estoque().local, Validators.required],
      fk_id_estoque: [this.estoque().id, Validators.required],
      tipo: [null, Validators.required],
      qtde: [null, [Validators.required, numeroPositivo()]],
      valorUnitario: [null, [Validators.required, numeroPositivo()]],
      fk_id_conversao: [null, Validators.required],
      taxaConversao: [null, numeroValido()],
      observacao: []
    });

    this.setarEstoque();
  }

  campoInvalido(campo: string): boolean {
    const controle = this.myForm.get(campo);
    return !!controle && controle.invalid && controle.touched;
  }

  // mensagem para campos numéricos (aceitam vírgula: 2,20)
  erroNumero(campo: string, msgObrigatorio: string): string {
    const erros = this.myForm.get(campo)?.errors;
    if (erros?.['required']) return msgObrigatorio;
    if (erros?.['numero']) return 'Digite um número válido, ex.: 2,20';
    if (erros?.['positivo']) return 'Deve ser maior que zero';
    return '';
  }

  private mostrarErro(erro: HttpErrorResponse) {
    if (erro.status === 401 || erro.status === 403) return;
    const mensagemBack = typeof erro.error === 'string' && erro.error.length < 200 ? erro.error : '';
    Swal.fire({
      icon: "info",
      title: "Erro ao salvar",
      text: mensagemBack || "Parece que não foi possível salvar a movimentação"
    });
  }

  onSubmit(e: Event) {
    e.preventDefault();

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    // converte "2,20" -> 2.2 antes de enviar (o back espera número no JSON)
    const valor = this.myForm.value;
    const movimentacao: MovimentacaoRequest = {
      ...valor,
      qtde: paraNumero(valor.qtde),
      valorUnitario: paraNumero(valor.valorUnitario),
      taxaConversao: paraNumero(valor.taxaConversao)
    };

    if (movimentacao.tipo == 'TIPO_ENTRADA') {
      this.movimentacaoService.saveEntrada(movimentacao).subscribe({
        next: () => {
          Swal.fire({
            icon: "success",
            title: "Sucesso ao salvar"
          });
          this.retorno.emit(movimentacao);
        },
        error: (erro: HttpErrorResponse) => this.mostrarErro(erro)
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
        error: (erro: HttpErrorResponse) => this.mostrarErro(erro)
      });
    }

  }
}
