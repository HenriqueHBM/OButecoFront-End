import { Component } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';


@Component({
  selector: 'app-menu',
  imports: [MdbCollapseModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class MenuComponent {

}
