import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '../services/database/auth';

export const gamesGuard: CanMatchFn = async(route, segments) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return (await auth.getSessionAsync() ? true : router.createUrlTree(["/"]));
};
