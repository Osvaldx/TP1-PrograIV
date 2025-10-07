import { Component, computed, OnInit, signal } from '@angular/core';
import { CardGame } from '../../components/card-game/card-game';
import { Chat } from '../../components/chat/chat';
import { Auth } from '../../services/database/auth';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-home',
  imports: [CardGame, Chat],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home{
  
  public showChat = signal<boolean>(false);
  public chatDisabled = computed(() => {
    return (this.auth.session()) ? false : true;
  })

  constructor(public auth: Auth) { }

  public toggleChat(): void {
    this.showChat.update(visible => !visible);
  }
}
