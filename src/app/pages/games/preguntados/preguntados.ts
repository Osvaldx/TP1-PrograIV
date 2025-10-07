import { Component, signal } from '@angular/core';
import { SelectedCategory } from "../../../directives/selected-category";
import { PreguntadosService } from '../../../services/preguntados-service';
import { QuestionStructure } from '../../../interfaces/question-structure';
import { SelectedAnswer } from "../../../directives/selected-answer";
import { ScaleBtnDirective } from "../../../directives/scale-btn-directive";
import { ToastManager } from '../../../services/toast-manager';
import { GamesService } from '../../../services/database/games-service';
import { GamesType } from '../../../enums/games-type';
import { sign } from 'crypto';

@Component({
  selector: 'app-preguntados',
  imports: [SelectedCategory, SelectedAnswer, ScaleBtnDirective],
  templateUrl: './preguntados.html',
  styleUrl: './preguntados.css'
})

export class Preguntados {
  public inGame = signal<boolean>(false);
  public gameover = signal<boolean>(false);
  public inParty = signal<boolean>(true);
  public selectedCategoryIndex = signal<number>(0);
  public question = signal<QuestionStructure | null>(null);
  public correctAnswers = signal<number>(0);
  public incorrectAnswers = signal<number>(0);
  public revealAnswers = signal<boolean>(false);
  public incorrectAnswerSelected = signal<number | null>(null);
  public points = signal<number>(0);

  public timer = signal<number>(0);
  private TIMER_ID: NodeJS.Timeout | null = null;

  public categories = ['programación', 'países', 'animales', 'cultura general'];
  private oldQuestions = new Set<number>();
  private questionsList = signal<QuestionStructure[]>([]);

  constructor(
    private PreguntadoService: PreguntadosService,
    private toast: ToastManager,
    private GamesDB: GamesService
  ) {}

  public selectCategory(categoryIndex: number) {
    this.selectedCategoryIndex.set(categoryIndex);
    console.log(this.categories[categoryIndex]);
  }

  public async startGame() {
    this.inGame.update(g => !g);
    this.getQuestions();
  }
  
  private getQuestions() {
    this.PreguntadoService.getQuestions().subscribe({
      next: (data: any) => {
        this.questionsList.set(data[this.categories[this.selectedCategoryIndex()]] as QuestionStructure[]);
        this.generateRandomQuestion();
        this.startTimer();
      },
      error: (err: any) => {
        console.error('Error al obtener las preguntas:', err);
      }
    });
  }

  private startTimer() {
    if(this.TIMER_ID) clearInterval(this.TIMER_ID as NodeJS.Timeout);

    this.TIMER_ID = setInterval(() => {
      this.timer.update(t => t + 1);
    }, 1000);
  }

  private stopTimer() {
    clearInterval(this.TIMER_ID as NodeJS.Timeout);
  }

  private generateRandomQuestion() {
    const questions = this.questionsList();
  
    if (this.oldQuestions.size >= questions.length) {
      this.question.set(null);
      this.toast.show("info", "Juego terminado: no quedan más preguntas", true, 3000);
      this.winner();
      return;
    }
  
    const index = this.getRandomNumber(0, questions.length - 1);
    this.question.set(questions[index]);
  }

  private getRandomNumber(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    let numberGenerated: number;
    do {
      numberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
    } while(this.oldQuestions.has(numberGenerated));

    this.oldQuestions.add(numberGenerated);
    console.log(this.oldQuestions);
    return numberGenerated
  }

  public validateSelectedOption(index: number) {
    if(this.validateCorrectAnswer(index)) {
      this.correctAnswers.update(c => c + 1);
      this.addOrRemovePoints(true);
    } else {
      this.incorrectAnswers.update(i => i + 1);
      this.incorrectAnswerSelected.set(index);
      this.addOrRemovePoints(false);
    }
    
    this.revealAnswers.update(r => !r);
    this.inParty.update(p => !p);

    if(this.incorrectAnswers() === 6) {
      this.loser();
    }
  }

  public validateCorrectAnswer(index: number) {
    return (this.question()?.opciones[index] == this.question()?.respuestaCorrecta)
  }

  public nextQuestion() {
    this.generateRandomQuestion();
    this.inParty.update(p => !p);
    this.revealAnswers.update(r => !r);
    this.incorrectAnswerSelected.set(null);
  }

  public addOrRemovePoints(correct: boolean) {
    if(correct) {
      this.points.update(p => p + 10);
      this.toast.show("success", "Correcto! +10 puntos", true, 3000);
    } else {
      if(this.points() >= 5) {
        this.points.update(p => p - 5);
        this.toast.show("error", "Incorrecto! -5 puntos", true, 3000);
      } else {
        this.points.update(p => p - this.points());
        this.toast.show("error", `Incorrecto!`, true, 3000);
      }
    }
  }

  public loser() {
    this.stopTimer();
    this.saveStats(false);
    this.toast.show("error", "Perdiste :(", true, 3000);
    this.gameover.set(true);
  }
  
  public winner() {
    this.stopTimer();
    this.saveStats(true);
    this.toast.show("success", "Ganastee :)", true, 3000);
    this.gameover.set(true);
  }

  public restartGame() {
    this.timer.set(0);
    this.gameover.set(false);
    this.inParty.set(true);
    this.selectedCategoryIndex.set(0);
    this.question.set(null);
    this.correctAnswers.set(0);
    this.incorrectAnswers.set(0);
    this.revealAnswers.set(false);
    this.incorrectAnswerSelected.set(null);
    this.points.set(0);
    this.oldQuestions.clear();
    this.questionsList.set([]);
    this.inGame.set(false);
  }

  private saveStats(winner: boolean) {
    this.GamesDB.insertStats(GamesType.preguntados, this.points(), winner, {
      correctAnswers: this.correctAnswers(),
      incorrectAnswers: this.incorrectAnswers(),
      time_played: this.timer()
    });
  }
}
