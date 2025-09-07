import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../services/database/auth';

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

    if(error) {
      alert("ocurrio algo y no cerro");
    } else {
      this.authService.currentUser.next(null);
    }

  }
}
