import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { GamesType } from '../../enums/games-type';
import { Auth } from './auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  
  constructor(private supabase: SupabaseService, private auth: Auth) { }

  public insertStats(games_type: GamesType, points: number, winner: boolean, details: {}) {
    this.auth.$user.pipe(take(1)).subscribe(async(user) =>{
      const { error, data } = await this.supabase.client.from('games').insert(
        {
          user_id: user?.id,
          game_type: games_type,
          points: points,
          winner: winner,
          details: details
        }
      )

      if(error) {
        console.log(error);
      }
    });
  }

  public async getCardsMayorOMenor() {
    const { data, error } = await this.supabase.client.from('cards').select("*");

    if(error) {
      console.log(error);
      return [];
    } else {
      return data;
    }
  }

}
