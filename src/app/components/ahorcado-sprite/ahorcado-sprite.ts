import { NgStyle } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Ahorcado } from '../../pages/games/ahorcado/ahorcado';

@Component({
  selector: 'app-ahorcado-sprite',
  imports: [NgStyle],
  templateUrl: './ahorcado-sprite.html',
  styleUrl: './ahorcado-sprite.css'
})
export class AhorcadoSprite {

  frameWidth = 100;

  constructor(private ahorcado: Ahorcado) {}

  get position() {
    return `-${this.ahorcado.frame() * this.frameWidth}px 0px`
  }

}
