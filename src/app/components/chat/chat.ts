import { Component, OnDestroy, OnInit, signal, input } from '@angular/core';
import { ChatService } from '../../services/database/chat-service';
import { Message } from '../../interfaces/messages-format';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat implements OnInit, OnDestroy {
  
  public messages = signal<Message[]>([]);
  public msg = signal<string>('');
  public isVisible = input<boolean>(false);
  private suscription!: RealtimeChannel;

  constructor(private chatS: ChatService) {}

  ngOnDestroy(): void {
    if(this.suscription) {
      this.suscription.unsubscribe();
    }
  }

  async ngOnInit(): Promise<void> {
    this.messages.set(await this.chatS.loadMessages())
    this.suscription = await this.chatS.listenForMessages((newMsg: Message) => {
      this.messages.update(msgs => [...msgs, newMsg]);
    });
  }

  public send() {
    if(!this.msg().trim()) { return; };
    
    this.chatS.sendMessage(this.msg())
    this.msg.set('');
  }

  public parseDate(created_at: string): string {
    if (!created_at) return '';
  
    const date = new Date(created_at);
  
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }

}
