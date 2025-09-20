import { Component, Input } from '@angular/core';
import { Nav } from '../nav/nav';
import { NavGames } from '../nav-games/nav-games';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Nav, NavGames],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

  @Input() type: 'home' | 'games' = 'home'; 

}
