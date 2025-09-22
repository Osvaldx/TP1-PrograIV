import { Component, OnInit, signal } from '@angular/core';
import { CardGame } from '../../components/card-game/card-game';
import { Chat } from '../../components/chat/chat';
import { Auth } from '../../services/database/auth';

@Component({
  selector: 'app-home',
  imports: [CardGame, Chat],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{
  
  public showChat = signal<boolean>(false);
  public chatDisabled = signal<boolean>(false);

  constructor(public auth: Auth) { }

  async ngOnInit(): Promise<void> {
    const session = await this.auth.getSessionAsync();
    this.chatDisabled.set((session) ? false : true);
  }

  public toggleChat(): void {
    this.showChat.update(visible => !visible);
  }
}
