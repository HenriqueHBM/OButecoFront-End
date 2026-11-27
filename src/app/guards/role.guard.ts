import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth/auth-service';
import { CargosEnum } from '../Enums/cargos-enum';

export const roleGuard: CanActivateFn = (route) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const minimo = route.data['cargo'] as CargosEnum;

  if (auth.temCargo(minimo)) {
    return true;
  }

  Swal.fire({
    icon: 'warning',
    title: 'Acesso negado',
    text: 'Seu cargo não tem permissão para esta tela.',
  });

  return router.createUrlTree(['/home']);
};