import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-games-layout',
  imports: [Header, RouterOutlet],
  templateUrl: './games-layout.html',
  styleUrl: './games-layout.css'
})
export class GamesLayout {

}
