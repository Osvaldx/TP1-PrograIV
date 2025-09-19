import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from "@supabase/supabase-js" 
import { environment as env } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

export interface CredetialsFormat {
  firstName: string,
  lastName: string,
  age: number,
  email: string,
  password: string,
  repeatPassword: string
}

@Injectable({
  providedIn: 'root'
})

export class Auth {

  private supabase: SupabaseClient;
  // BehaviorSubject para guardar el usuario actual
  private currentUser = new BehaviorSubject<User | null>(null);
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

  public async register(credentials: CredetialsFormat) {
    const email = credentials.email;
    const password = credentials.password;

    const resp = await this.supabase.auth.signUp({ email, password });
    
    if(!resp.error && resp.data.user) {
      const { error } = await this.supabase.from("profiles").insert({
        id: resp.data.user.id,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        age: credentials.age
      });
      console.log(error);
    }

    return resp;
  }

  public signOut() {
    return this.supabase.auth.signOut();
  }

  public resetUser() {
    this.currentUser.next(null);
  }

  async getSessionAsync() {
    const { data } = await this.supabase.auth.getSession()
    return data.session;
  }

  public async getCredentials(user: User) {
    let credentials = {
      email: user.email ?? "",
      firstName: ""
    }

    const { error, data } = await this.supabase.from("profiles").select("firstName").eq("id", user.id).single();

    if(!error && data) {
      credentials.firstName = data.firstName;
    }

    return credentials
  }

}
