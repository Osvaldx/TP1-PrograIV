import { Directive, effect, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Preguntados } from '../pages/games/preguntados/preguntados';

@Directive({
  selector: '[appSelectedCategory]'
})
export class SelectedCategory {

  @Input() index!: number;

  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private preguntados: Preguntados
  ){
    effect(() => {
      this.addStyles();
    });
  }

  private addStyles() {
    this.render.removeClass(this.el.nativeElement, 'bg-yellow-500');
    this.render.removeClass(this.el.nativeElement, 'bg-blue-800');
    this.render.removeClass(this.el.nativeElement, 'text-white');
    this.render.removeClass(this.el.nativeElement, 'text-blue-900');

    if (this.preguntados.selectedCategoryIndex() === this.index) {
      this.render.addClass(this.el.nativeElement, 'bg-yellow-500');
      this.render.addClass(this.el.nativeElement, 'text-blue-800');
    } else {
      this.render.addClass(this.el.nativeElement, 'bg-blue-800');
      this.render.addClass(this.el.nativeElement, 'text-white');
    }
  }
}