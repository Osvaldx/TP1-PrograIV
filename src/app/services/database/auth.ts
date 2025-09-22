import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from "@supabase/supabase-js" 
import { environment as env } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase-service';

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

  private currentUser = new BehaviorSubject<User | null>(null);
  public $user = this.currentUser.asObservable();

  constructor(private supabase: SupabaseService) {
    this.supabase.client = createClient(env.supabase.API_URL, env.supabase.API_KEY);

    this.supabase.client.auth.onAuthStateChange((_, session) => {
      this.currentUser.next(session?.user ?? null);
    })
  }

  public login(email: string, password: string) {
    return this.supabase.client.auth.signInWithPassword({email,password});
  }

  public async register(credentials: CredetialsFormat) {
    const email = credentials.email;
    const password = credentials.password;

    const resp = await this.supabase.client.auth.signUp({ email, password });
    
    if(!resp.error && resp.data.user) {
      const { error } = await this.supabase.client.from("profiles").insert({
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
    return this.supabase.client.auth.signOut();
  }

  public resetUser() {
    this.currentUser.next(null);
  }

  async getSessionAsync() {
    const { data } = await this.supabase.client.auth.getSession()
    return data.session;
  }

  public async getCredentials(user: User) {
    let credentials = {
      email: user.email ?? "",
      firstName: ""
    }

    const { error, data } = await this.supabase.client.from("profiles").select("firstName").eq("id", user.id).single();

    if(!error && data) {
      credentials.firstName = data.firstName;
    }

    return credentials
  }

}
