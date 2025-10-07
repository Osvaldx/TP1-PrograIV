import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Auth } from '../services/database/auth';
import { ToastManager } from '../services/toast-manager';

export const gamesGuard: CanMatchFn = async(route, segments) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const toast = inject(ToastManager)

  if(await auth.getSessionAsync()) {
    return true;
  } else {
    toast.show("info", "Tienes que estar logeado para poder jugar!", true, 3000);
    return router.createUrlTree(["/"]);
  }
};
