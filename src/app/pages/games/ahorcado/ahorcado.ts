import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Keyboard } from '../../../components/keyboard/keyboard';
import { LetterFormat } from '../../../interfaces/letter-format';
import { RandomWord } from '../../../services/random-word';
import { WordFormat } from '../../../interfaces/randomW-format';
import { ToastManager } from '../../../services/toast-manager';
import { AhorcadoSprite } from '../../../components/ahorcado-sprite/ahorcado-sprite';
import { GameAhorcado } from '../../../services/database/game-ahorcado';

@Component({
  selector: 'app-ahorcado',
  imports: [Keyboard, AhorcadoSprite],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})

export class Ahorcado implements OnDestroy, OnInit{

  private wordData = signal<WordFormat | null>(null);
  public secretWord = signal<string>("...");
  public errors: string[] = [];
  public frame = signal<number>(0);
  public blockKeys = signal<boolean>(false);
  public reset = signal<boolean>(false);
  public timePlaying = signal<number>(0);
  private timeID: NodeJS.Timeout | null = null;
  public selectedCards = signal<number>(0);

  constructor(private apiWord: RandomWord, private toast: ToastManager, private gameAhorcado: GameAhorcado) { }

  ngOnInit(): void {
    this.timer();
    this.generateWord();
  }
  
  ngOnDestroy(): void {
    clearInterval(this.timeID as NodeJS.Timeout);
  }
  
  private validateGame() {
    if(!this.wordData() || !this.wordData()?.word) {
      this.blockKeys.set(true);
      clearInterval(this.timeID as NodeJS.Timeout);
    } else {
      this.blockKeys.set(false);
    }
  }
  
  private timer() {    
    this.timeID = setInterval(() => {
      this.timePlaying.update(t => t + 1);
    }, 1000);
  }
  
  private async generateWord() {
    await this.apiWord.getRandomWord().subscribe(async(data) => {
      try {
        await this.wordData.set(data[0]);
        await this.secretWord.set("_".repeat(this.wordData()?.word.length!))
        console.log(`API DATA: ${data[0].word}`);
      } catch(error) {
        console.log(error);
      }
    })
    setTimeout(() => {
      this.validateGame();
    }, 500);
  }

  public handleLetter($event: LetterFormat) {
    this.verifyWord($event.letter.toLowerCase());
  }
  
  public verifyWord(letter: string) {
    if (!this.secretWord().includes("_") || this.blockKeys()) return;
  
    const word = this.wordData()?.word.toLowerCase();
    if (!word) {
      this.toast.show("error", "No hay una palabra disponible", true, 3000);
      return;
    }
  
    const cleanWord = this.removeAccents(word);
  
    if (cleanWord.includes(letter)) {
      this.revealLetter(cleanWord, letter);
    } else {
      this.registerError(letter);
    }
  }
  
  private revealLetter(word: string, letter: string) {
    const positions = word.split("").reduce((acc, char, i) => {
      if (char === letter) acc.push(i);
      return acc;
    }, [] as number[]);
  
    let chars = this.secretWord().split("");
    positions.forEach(i => chars[i] = letter);
  
    this.secretWord.set(chars.join(""));
  
    if (!this.secretWord().includes("_")) {
      this.winGame();
    }
  }

  private revealWord() {
    this.secretWord.set(this.wordData()?.word!);
  }
  
  private registerError(letter: string) {
    if (this.errors.length < 6) {
      this.errors.push(letter.toUpperCase());
      this.frame.set(this.errors.length);
      console.log(`error: ${letter}`);
  
      if (this.errors.length === 6) {
        this.loseGame();
      }
    }
  }
  
  private winGame() {
    this.toast.show("success", "GANASTEE!!", true, 3000);
    this.blockKeys.set(true);
    console.log(`ERRORES: ${this.errors}`);
    clearInterval(this.timeID as NodeJS.Timeout);
    console.log(`Toco total: ${this.selectedCards()}`)
    this.gameAhorcado.insertStats(this.timePlaying(), true, this.selectedCards(), this.errors.length)
  }
  
  private loseGame() {
    this.blockKeys.set(true);
    this.toast.show("error", "PERDISTE!", true, 3000);
    console.log(this.errors);
    clearInterval(this.timeID as NodeJS.Timeout);
    this.revealWord();
    console.log(`Toco total: ${this.selectedCards()}`)
    this.gameAhorcado.insertStats(this.timePlaying(), false, this.selectedCards(), this.errors.length)
  }

  public removeAccents(word: string) {
    return word.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  public resetGame() {
    this.generateWord();
    this.blockKeys.set(false);
    this.selectedCards.set(0);
    this.validateGame();
    this.errors = [];
    this.frame.set(0);
    this.reset.set(true);
    clearInterval(this.timeID as NodeJS.Timeout);
    this.timePlaying.set(0);
    this.timer();

    setTimeout(() => {
      this.reset.set(false);
    }, 3000);
  }

}
