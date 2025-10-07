import { Component, OnInit, signal } from '@angular/core';
import { GamesType } from '../../../enums/games-type';
import { TablesDB } from '../../../services/tables-db';
import { TopColors } from "../../../directives/top-colors";

@Component({
  selector: 'app-snakegame-scoreboard',
  imports: [TopColors],
  templateUrl: './snakegame-scoreboard.html',
  styleUrl: './snakegame-scoreboard.css'
})
export class SnakegameScoreboard implements OnInit {

  public dataSnake = signal<any[] | null>(null);

  constructor(private tableDB: TablesDB) { }

  async ngOnInit(): Promise<void> {
    const data = await this.tableDB.getDataTableOfDB(GamesType.snake_game);
    console.log(data);
    this.dataSnake.set(data ?? null);
  }

}
