import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase-service';
import { Auth } from './auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MayorMenor {

  constructor(private supabase: SupabaseService, private auth: Auth) {}

  public async getCards() {
    const { data, error } = await this.supabase.client.from('cards').select("*");

    if(error) {
      console.log(error);
      return [];
    } else {
      return data;
    }
  }

  public savePlayerData(correctCards: number, errors: number, points: number) {
    this.auth.$user.pipe(take(1)).subscribe(async(user) => {
      const { error } = await this.supabase.client
      .from('games_mayoromenor')
      .insert({ user_id: user?.id ,correct_cards: correctCards, errors: errors, points: points})

      if(error) { console.log(error) };
    })
  }
  
}
