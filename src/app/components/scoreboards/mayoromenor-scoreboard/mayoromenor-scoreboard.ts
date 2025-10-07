import { Component, signal } from '@angular/core';
import { GamesType } from '../../../enums/games-type';
import { TablesDB } from '../../../services/tables-db';
import { TopColors } from '../../../directives/top-colors';

@Component({
  selector: 'app-mayoromenor-scoreboard',
  imports: [TopColors],
  templateUrl: './mayoromenor-scoreboard.html',
  styleUrl: './mayoromenor-scoreboard.css'
})
export class MayoromenorScoreboard {

  public dataMayorOMenor = signal<any[] | null>(null);

  constructor(private tableDB: TablesDB) { }

  async ngOnInit(): Promise<void> {
    const data = await this.tableDB.getDataTableOfDB(GamesType.mayoromenor);
    console.log(data);
    this.dataMayorOMenor.set(data ?? null);
  }
}
