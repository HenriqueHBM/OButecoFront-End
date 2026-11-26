
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { AuthService } from '../../services/auth/auth-service';
import { CargosEnum } from '../../Enums/cargos-enum';

@Component({
  selector: 'app-menu',
  imports: [MdbCollapseModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  protected auth = inject(AuthService);
  protected readonly cargos = CargosEnum;

  private router = inject(Router);

  sair() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
