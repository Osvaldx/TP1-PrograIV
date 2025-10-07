import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeColorBtnPlayDirective]'
})
export class ChangeColorBtnPlayDirective {

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.render.addClass(this.el.nativeElement, 'bg-yellow-500');
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.render.removeClass(this.el.nativeElement, 'bg-yellow-500');
  }

}
