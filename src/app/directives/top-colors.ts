import { Directive, ElementRef, Input, Renderer2, } from '@angular/core';

@Directive({
  selector: '[appTopColors]'
})
export class TopColors {

  @Input() puesto!: number;

  constructor(private el: ElementRef, private render: Renderer2) {
    setTimeout(() => {
      this.setStyle();
    }, 100);
  }

  private setStyle() {
    console.log(this.puesto);
    switch(this.puesto) {
      case 1: this.render.addClass(this.el.nativeElement, 'bg-yellow-400/50'); break;
      case 2: this.render.addClass(this.el.nativeElement, 'bg-gray-400/50'); break;
      case 3: this.render.addClass(this.el.nativeElement, 'bg-orange-200'); break;
      default: this.render.addClass(this.el.nativeElement, 'hover:bg-blue-100');
    }
  }

}
