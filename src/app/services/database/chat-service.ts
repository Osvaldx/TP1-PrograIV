import { Injectable } from '@angular/core';
import { Message } from '../../interfaces/messages-format';
import { SupabaseService } from './supabase-service';
import { Auth } from './auth';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private supabase: SupabaseService, private auth: Auth) { }

  async loadMessages() {
    const { data, error } = await this.supabase.client
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true }).limit(10);

    if(error) throw error;

    return data as Message[];
  }

  async sendMessage(message: string) {
    this.auth.$user.pipe(take(1)).subscribe(async(user) => {
      const { data } = await this.supabase.client.from("profiles").select("firstName").eq("id", user?.id).single();

      const { error } = await this.supabase.client
      .from('messages')
      .insert({
        user_id: user?.id,
        first_name: data?.firstName,
        content: message
      })

      if(error) throw error;

    })
  }

  public listenForMessages(callback: (msg: Message) => void) {
    return this.supabase.client
      .channel('realtime:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          callback(payload.new as Message);
        }
      )
      .subscribe();
  }

}
