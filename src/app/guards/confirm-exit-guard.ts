import { CanDeactivateFn } from '@angular/router';
import { CanExit } from '../interfaces/can-exit';

export const confirmExitGuard: CanDeactivateFn<CanExit> = (component, currentRoute, currentState, nextState) => {
  if(component.inGame()) {
    return confirm("Estas en partida, si sales se perdera todo tu avance");
  }

  return true;
};
