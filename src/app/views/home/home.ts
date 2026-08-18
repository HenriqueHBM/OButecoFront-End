import { Component } from '@angular/core';
import { MdbFormsModule } from "mdb-angular-ui-kit/forms";
import { MenuComponent } from "../menu/menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MdbFormsModule, MenuComponent, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
