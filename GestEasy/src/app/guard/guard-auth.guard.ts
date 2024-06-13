import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage.service';

export const guardAuthGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.verificarSeEstaAutenticado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
