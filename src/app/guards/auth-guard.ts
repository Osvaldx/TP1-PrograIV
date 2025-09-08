import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/database/auth';

export const authGuard: CanActivateFn = async (route, state) => {

  const authService = inject(Auth)
  const router = inject(Router);

  const user = await authService.getSessionAsync();

  return user ? router.createUrlTree(["/"]) : true;
};
