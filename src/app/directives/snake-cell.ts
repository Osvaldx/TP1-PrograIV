import { Directive, effect, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { Snakegame } from '../pages/games/snakegame/snakegame';

@Directive({
  selector: '[appSnakeCell]'
})
export class SnakeCell {

  @Input() index!: number;

  constructor(private el: ElementRef, private render: Renderer2, private snakeGame: Snakegame) {
    effect(() => {
      const snake = this.snakeGame.snake();
      const food = this.snakeGame.food();
  
      this.render.removeClass(this.el.nativeElement, 'bg-green-500');
      this.render.removeClass(this.el.nativeElement, 'bg-red-500');
      this.render.removeClass(this.el.nativeElement, 'bg-gray-200');

      if(this.snakeGame.inGame()) {
        if (snake.includes(this.index)) {
          this.render.addClass(this.el.nativeElement, 'bg-green-500');
        } else if (food === this.index) {
          this.render.addClass(this.el.nativeElement, 'bg-red-500');
        } else {
          this.render.addClass(this.el.nativeElement, 'bg-gray-200');
        }
      } else {
        this.render.addClass(this.el.nativeElement, 'bg-gray-200');
      }
    });
  }
}
