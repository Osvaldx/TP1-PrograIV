import { Component, signal } from '@angular/core';
import { Keyboard } from '../../../components/keyboard/keyboard';
import { LetterFormat } from '../../../interfaces/letter-format';
import { RandomWord } from '../../../services/random-word';
import { WordFormat } from '../../../interfaces/randomW-format';
import { ToastManager } from '../../../services/toast-manager';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  imports: [Keyboard],
  templateUrl: './ahorcado.html',
  styleUrl: './ahorcado.css'
})

export class Ahorcado {

  private wordData = signal<WordFormat | null>(null);
  public secretWord = signal<string>("...");
  public errors: string[] = [];
  public blockKeys = signal<boolean>(false);
  public reset = signal<boolean>(false);
  public timePlaying = signal<number>(60);
  private timeID: NodeJS.Timeout | null = null;

  constructor(private apiWord: RandomWord, private toast: ToastManager, private router: Router) { }

  ngOnInit() {
    this.generateWord();
    this.oClock();
  }
  
  private oClock() {    
    this.timeID = setInterval(() => {
      this.timePlaying.update(t => t - 1);
      if(this.timePlaying() === 0) {
        this.loseGame();
      }
    }, 1000);
  }
  
  private generateWord() {
    this.apiWord.getRandomWord().subscribe((data) => {
      try {
        this.wordData.set(data[0]);
        this.secretWord.set("_".repeat(this.wordData()?.word.length!))
        console.log(`API DATA: ${data[0].word}`);
      } catch(error) {
        console.log(error);
      }
    })
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
  }
  
  private loseGame() {
    this.blockKeys.set(true);
    this.toast.show("error", "PERDISTE!", true, 3000);
    console.log(this.errors);
    clearInterval(this.timeID as NodeJS.Timeout);
    this.revealWord();
  }

  public removeAccents(word: string) {
    return word.normalize("NFD").replace(/\p{Diacritic}/gu, "");
  }

  public resetGame() {
    this.generateWord();
    this.blockKeys.set(false);
    this.errors = [];
    this.reset.set(true);
    this.timePlaying.set(60);
    this.oClock();

    setTimeout(() => {
      this.reset.set(false);
    }, 3000);
  }

}
