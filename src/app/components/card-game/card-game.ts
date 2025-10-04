import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangeColorBtnPlayDirective } from "../../directives/change-color-btn-play-directive";

@Component({
  selector: 'app-card-game',
  imports: [RouterLink, ChangeColorBtnPlayDirective],
  templateUrl: './card-game.html',
  styleUrl: './card-game.css'
})
export class CardGame {

  @Input() gameName!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() urlPhoto!: string;
  @Input() routerGame!: string;

}
