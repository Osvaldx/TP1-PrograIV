import { Component } from '@angular/core';
import { CardGame } from '../../components/card-game/card-game';

@Component({
  selector: 'app-home',
  imports: [CardGame],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
