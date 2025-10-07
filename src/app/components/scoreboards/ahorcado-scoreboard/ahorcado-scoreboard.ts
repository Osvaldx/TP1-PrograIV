import { Component, signal } from '@angular/core';
import { GamesType } from '../../../enums/games-type';
import { TablesDB } from '../../../services/tables-db';
import { TopColors } from '../../../directives/top-colors';

@Component({
  selector: 'app-ahorcado-scoreboard',
  imports: [TopColors],
  templateUrl: './ahorcado-scoreboard.html',
  styleUrl: './ahorcado-scoreboard.css'
})
export class AhorcadoScoreboard {

  public dataAhorcado = signal<any[] | null>(null);

  constructor(private tableDB: TablesDB) { }

  async ngOnInit(): Promise<void> {
    const data = await this.tableDB.getDataTableOfDB(GamesType.ahorcado);
    console.log(data);
    this.dataAhorcado.set(data ?? null);
  }
}
