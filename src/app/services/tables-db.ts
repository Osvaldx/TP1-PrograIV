import { Injectable } from '@angular/core';
import { SupabaseService } from './database/supabase-service';

@Injectable({
  providedIn: 'root'
})
export class TablesDB {

  constructor(private supabase: SupabaseService) {}

  public async getDataOfTable() {
    const { data, error } = await this.supabase.client.from('games').select("*");

    if(error) {
      console.log(error);
      return [];
    }

    return data;
  }
  
}
