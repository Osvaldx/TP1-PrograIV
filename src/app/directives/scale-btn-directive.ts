import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScaleBtnDirective]' // define como se va a aplicar en el DOM
})
export class ScaleBtnDirective {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.render.addClass(this.el.nativeElement, 'transition-transform');
    this.render.addClass(this.el.nativeElement, 'duration-300');
    this.render.addClass(this.el.nativeElement, 'scale-105');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.render.removeClass(this.el.nativeElement, 'scale-105');
  }

}
