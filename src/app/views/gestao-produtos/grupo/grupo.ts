import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { GrupoTable } from './grupo-table/grupo-table';

@Component({
  selector: 'app-grupos',
  imports: [GrupoTable],
  templateUrl: './grupos.html',
  styleUrl: './grupos.scss',
})
export class Grupos {

  constructor(
    private _location: Location
  ){

  }
  backCliked(){
    this._location.back();
  }
}
