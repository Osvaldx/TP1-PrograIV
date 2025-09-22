import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  
  public client: SupabaseClient;

  constructor() {
    this.client = createClient(env.supabase.API_URL, env.supabase.API_KEY);
  }

}
