import { Component, signal } from '@angular/core';
import { TablesDB } from '../../../services/tables-db';
import { GamesType } from '../../../enums/games-type';
import { TopColors } from '../../../directives/top-colors';

@Component({
  selector: 'app-preguntados-scoreboard',
  imports: [TopColors],
  templateUrl: './preguntados-scoreboard.html',
  styleUrl: './preguntados-scoreboard.css'
})
export class PreguntadosScoreboard {
  
  public dataPreguntados = signal<any[] | null>(null);

  constructor(private tableDB: TablesDB) { }

  async ngOnInit(): Promise<void> {
    const data = await this.tableDB.getDataTableOfDB(GamesType.preguntados);
    console.log(data);
    this.dataPreguntados.set(data ?? null);
  }
}
