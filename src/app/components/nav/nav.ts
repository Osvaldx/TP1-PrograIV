import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {

  protected hide: boolean = false;

  constructor(private change: ChangeDetectorRef) { }

  public hideMenu(): void {
    this.hide = !this.hide;
    this.change.detectChanges();
  }
}
