import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-game',
  imports: [],
  templateUrl: './card-game.html',
  styleUrl: './card-game.css'
})
export class CardGame {

  @Input() gameName!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() urlPhoto!: string;

}
