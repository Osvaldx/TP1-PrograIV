import { Component, EventEmitter, Output } from '@angular/core';
import { Key } from '../key/key';
import { LetterFormat } from '../../interfaces/letter-format';

@Component({
  selector: 'app-keyboard',
  imports: [Key],
  templateUrl: './keyboard.html',
  styleUrl: './keyboard.css'
})
export class Keyboard {

  @Output() LetterSelect = new EventEmitter<LetterFormat>();

  public keyboardKeys = 'QWERTYUIOP+ASDFGHJKLÑ+ZXCVBNM'
  .split("+")
  .map((row, rowIndex, rows) => {
    const oldRlen = rows.slice(0, rowIndex).reduce((acc, r) => acc + r.length, 0);

    return row.split("").map((letter, index) => ({
      letter: letter,
      index: oldRlen + index
    }))
  })

  constructor() {}

  public sendLetter($event: LetterFormat) {
    this.LetterSelect.emit($event);
  }

}
