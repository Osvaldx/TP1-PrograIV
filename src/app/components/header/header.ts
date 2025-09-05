import { Component, ChangeDetectorRef } from '@angular/core';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Nav],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
