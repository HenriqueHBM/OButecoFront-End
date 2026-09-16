import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CategoriaTable } from './categoria-table/categoria-table';

@Component({
  selector: 'app-categorias',
  imports: [CategoriaTable],
  templateUrl: './categorias.html',
  styleUrl: './categorias.scss',
})
export class Categorias {

  constructor(
    private _location: Location
  ){

  }
  backCliked(){
    this._location.back();
  }
}
