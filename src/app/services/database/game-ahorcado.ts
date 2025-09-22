import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Auth } from './auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameAhorcado {

  constructor(private supabase: SupabaseService, private auth: Auth) { }

  public insertStats(time: number, winner: boolean, selectedLetters: number, errors: number) {
    this.auth.$user.pipe(take(1)).subscribe(async (user) => {
      if(!user) { return; };

      const { data, error } = await this.supabase.client.from('games_ahorcado').insert(
        {
          user_id: user.id,
          time_playing: time,
          winner: winner,
          selected_letters: selectedLetters,
          errors: errors
        }
      )

      if(error) {
        console.error(`ERROR: ${error}`);
      } else {
        console.log(`Datos insertados: ${data}`);
      }
    })
  }
 
}