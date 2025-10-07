import { Component, signal } from '@angular/core';
import { AhorcadoScoreboard } from '../../components/scoreboards/ahorcado-scoreboard/ahorcado-scoreboard';
import { MayoromenorScoreboard } from '../../components/scoreboards/mayoromenor-scoreboard/mayoromenor-scoreboard';
import { PreguntadosScoreboard } from '../../components/scoreboards/preguntados-scoreboard/preguntados-scoreboard';
import { SnakegameScoreboard } from '../../components/scoreboards/snakegame-scoreboard/snakegame-scoreboard';

@Component({
  selector: 'app-results',
  imports: [AhorcadoScoreboard, MayoromenorScoreboard, PreguntadosScoreboard, SnakegameScoreboard],
  templateUrl: './results.html',
  styleUrl: './results.css'
})
export class Results {

  public tableSelected = signal<string | null>(null);

  public select(type: string) {
    this.tableSelected.set(type);
  }
}
