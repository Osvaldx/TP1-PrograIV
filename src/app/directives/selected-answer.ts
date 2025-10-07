import { Directive, effect, ElementRef, Input, Renderer2 } from '@angular/core';
import { Preguntados } from '../pages/games/preguntados/preguntados';

@Directive({
  selector: '[appSelectedAnswer]'
})
export class SelectedAnswer {
  
  @Input() index!: number;

  constructor(private el: ElementRef, private render: Renderer2, private preguntados: Preguntados) {
    effect(() => {
      this.addStyles();
    })
  }

  private addStyles() {
    if(this.preguntados.revealAnswers()) {
      if(this.preguntados.validateCorrectAnswer(this.index)) {
        this.render.addClass(this.el.nativeElement, "bg-green-400");
        this.render.addClass(this.el.nativeElement, "text-white");
      } else if(this.preguntados.incorrectAnswerSelected() == this.index) {
        this.render.addClass(this.el.nativeElement, "bg-red-400");
        this.render.addClass(this.el.nativeElement, "text-red-800");
      } else {
        this.render.addClass(this.el.nativeElement, "bg-gray-300"); 
        this.render.addClass(this.el.nativeElement, "text-gray-500");
      }
    } else {
      this.render.removeClass(this.el.nativeElement, "bg-gray-300"); 
      this.render.removeClass(this.el.nativeElement, "bg-green-400");
      this.render.removeClass(this.el.nativeElement, "bg-red-400");
      this.render.removeClass(this.el.nativeElement, "text-white");
      this.render.removeClass(this.el.nativeElement, "text-red-800");
      this.render.removeClass(this.el.nativeElement, "text-gray-500");
      this.render.addClass(this.el.nativeElement, "bg-blue-800");
      this.render.addClass(this.el.nativeElement, "text-white");
    }
  }

}
