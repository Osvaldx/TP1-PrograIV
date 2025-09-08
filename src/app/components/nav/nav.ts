import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/database/auth';
import { ToastManager } from '../../services/toast-manager';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})

export class Nav {

  protected hideButton: boolean = false;
  protected hide: boolean = false;

  authService = inject(Auth);
  toastManager = inject(ToastManager);
  router = inject(Router);

  constructor(private change: ChangeDetectorRef) {
    this.authService.$user.subscribe((user) => {
      if(user) {
        this.hideButton = true;
        this.change.markForCheck();
      } else {
        this.hideButton = false;
        this.change.markForCheck();
      }
    })
  }

  public hideMenu(): void {
    this.hide = !this.hide;
    this.change.detectChanges();
  }

  public async signOut() {
    const { error } = await this.authService.signOut();

    if(!error) {
      this.authService.resetUser();
      this.toastManager.show("success", "Se cerro la sesion correctamente", true, 3000);
      this.sendLogin();
    } else {
      this.toastManager.show("error", "Algo ocurrio, intente más tarde", true, 3000);
    }
  }

  public sendLogin() {
    return this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }
}
