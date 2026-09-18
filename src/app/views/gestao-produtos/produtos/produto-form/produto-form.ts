import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-produto-form',
  imports: [],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss',
})
export class ProdutoForm {
  constructor(public modalRef: MdbModalRef<ProdutoForm>) {}
}
