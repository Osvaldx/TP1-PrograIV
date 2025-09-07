import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from "@supabase/supabase-js" 
import { environment as env } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Auth {

  private supabase: SupabaseClient;
  // BehaviorSubject para guardar el usuario actual
  public currentUser = new BehaviorSubject<User | null>(null);
  // Observable para que los componentes se suscriban
  public $user = this.currentUser.asObservable();

  constructor() {
    this.supabase = createClient(env.supabase.API_URL, env.supabase.API_KEY);

    this.supabase.auth.onAuthStateChange((_, session) => {
      this.currentUser.next(session?.user ?? null);
    })
  }

  public login(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({email,password});
  }

  public register(email: string, password: string) {
    return this.supabase.auth.signUp({email, password});
  }

  public signOut() {
    return this.supabase.auth.signOut();
  }

}
