import { Component, effect, EventEmitter, Input, Output } from '@angular/core';
import { LetterFormat } from '../../interfaces/letter-format';
import { Ahorcado } from '../../pages/games/ahorcado/ahorcado';

@Component({
  selector: 'app-key',
  imports: [],
  templateUrl: './key.html',
  styleUrl: './key.css'
})

export class Key {

  @Input() letter?: string;
  @Input() indexL?: number;
  @Output() clickedLetter = new EventEmitter<LetterFormat>();
  public disableKey: boolean = false;

  constructor(private ahorcado: Ahorcado) {
    effect(() => {
      if(this.ahorcado.reset()) { this.disableKey = false };
    })
  }
  
  public sendLetter() {
    this.ahorcado.selectedCards.update(c => c + 1);
    this.clickedLetter.emit({letter: this.letter!, index: this.indexL!})
    console.log(this.ahorcado.selectedCards());
    this.disableKey = true;
  }

  get isDisabled() {
    return this.ahorcado.blockKeys() || this.disableKey;
  }
}
