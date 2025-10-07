import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CardFormat } from '../../../interfaces/card-format';
import { ToastManager } from '../../../services/toast-manager';
import { CanExit } from '../../../interfaces/can-exit';
import { GamesService } from '../../../services/database/games-service';
import { GamesType } from '../../../enums/games-type';
import { DetailsMayoromenor } from '../../../interfaces/details-mayoromenor';

@Component({
  selector: 'app-mayoromenor',
  imports: [],
  templateUrl: './mayoromenor.html',
  styleUrl: './mayoromenor.css'
})
export class Mayoromenor implements OnInit, OnDestroy, CanExit{

  private cards: CardFormat[] = [];
  public errors = signal<number>(0);
  public points = signal<number>(0);
  public racha = signal<number>(0);
  public currentCard = signal<CardFormat | null>(null);
  public inGame = signal<boolean>(true);

  constructor(
    protected toast: ToastManager,
    private gameDB: GamesService
  ) {}

  ngOnDestroy(): void {
    this.errors.set(0);
    this.points.set(0);
    this.inGame.set(false);
  }

  async ngOnInit(): Promise<void> {
    await this.generateCards();      
    if(this.cards.length > 0) {
      this.choiceRandomCard();
    }
  }
  
  public async generateCards(): Promise<void> {
    this.cards = await this.gameDB.getCardsMayorOMenor();
  }

  private choiceRandomCard(): void {
    const i = this.randomNumber
    this.currentCard.set(this.cards[i]);
  }

  private get randomNumber(): number {
    return Math.floor(Math.random() * 52);
  }

  public validateSelect(isMajor: boolean) {
    const oldCard = this.currentCard();
    this.choiceRandomCard();
    
    if(!oldCard) { return }
    
    console.log(`carta old: ${oldCard.valor} | carta nueva: ${this.currentCard()?.valor}`);

    if(isMajor) {
      if(oldCard.valor < this.currentCard()?.valor!) {
        this.isWinner(true, "Ganaste, era mayor | +10 puntos");
      } else {
        this.isWinner(false, "Perdiste, era menor :(");
      }
    } else {
      if(oldCard.valor > this.currentCard()?.valor!) {
        this.isWinner(true, "Ganaste, era menor | +10 puntos");
      } else {
        this.isWinner(false, "Perdiste, era mayor :(");
      }
    }

    if(this.isDisabled) {
      this.inGame.set(false);
      this.saveStats((this.racha() >= 50) ? true : false);
    }
  }

  private isWinner(winner: boolean, message: string): void {
    if(winner) {
      this.points.update(n => n + 10);
      this.racha.update(n => n + 1);
      this.toast.show("success", message, true, 1000);
    } else {
      this.toast.show("error", message, true, 1000);
      this.errors.update(n => n + 1);
    }
  }

  protected get isDisabled() {
    return (this.errors() === 6);
  }

  public resetGame() {
    this.errors.set(0);
    this.points.set(0);
    this.racha.set(0);
    this.choiceRandomCard();
    this.inGame.set(true);
  }

  private saveStats(winner: boolean) {
    this.gameDB.insertStats(GamesType.mayoromenor, this.points(), winner, { correctCards: this.racha(), errors: this.errors() } as DetailsMayoromenor)
  }

}
