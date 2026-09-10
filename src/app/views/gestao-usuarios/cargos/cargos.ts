import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { CargoTable } from './cargo-table/cargo-table';
@Component({
  selector: 'app-cargos',
  imports: [CargoTable],
  templateUrl: './cargos.html',
  styleUrl: './cargos.scss',
})
export class Cargos {

  constructor(
    private _location: Location
  ){
    
  }
  backCliked(){
    this._location.back();
  }
}
