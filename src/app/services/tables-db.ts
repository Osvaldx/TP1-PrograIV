import { Injectable } from '@angular/core';
import { SupabaseService } from './database/supabase-service';
import { GamesType } from '../enums/games-type';
 
@Injectable({
  providedIn: 'root'
})

export class TablesDB {

  constructor(private supabase: SupabaseService) {}

  public async getDataTableOfDB(type: GamesType) {
    if(type != "ahorcado") {
      return this.getDataOfAnotherTable(type);
    } else {
      return this.getDataOfAhorcado();
    }
  }

  private async getDataOfAhorcado() {
    const { data, error } = await this.supabase.client
    .from('games')
    .select("*, profiles ( firstName )")
    .eq('game_type', 'ahorcado')
    .eq('winner', true);

    if(error) {
      console.log(error);
      return []
    }

    return data.sort((a, b) => a.details.time_playing - b.details.time_playing).slice(0, 5);
  }
  
  private async getDataOfAnotherTable(type: GamesType) {
    const { data, error } = await this.supabase.client
    .from('games')
    .select("*, profiles ( firstName )")
    .eq('game_type', type)
    .order('points', { ascending: false }).limit(5);

    if(error) return console.log(error);

    return data;
  }
  
}
