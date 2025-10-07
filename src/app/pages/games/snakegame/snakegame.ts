import { Component, computed, HostListener, OnDestroy, OnInit, signal } from '@angular/core';
import { SnakeCell } from "../../../directives/snake-cell";
import { ToastManager } from '../../../services/toast-manager';
import { ScaleBtnDirective } from "../../../directives/scale-btn-directive";
import { GamesService } from '../../../services/database/games-service';
import { GamesType } from '../../../enums/games-type';

const keyDownDirecction: Record<string, string> = {
  'KeyW': 'up',
  'KeyS': 'down',
  'KeyA': 'left',
  'KeyD': 'right'
};

const oppositesDirection: Record<string, string> = {
  'up': 'down',
  'down': 'up',
  'right': 'left',
  'left': 'right'
};

@Component({
  selector: 'app-snakegame',
  imports: [SnakeCell, ScaleBtnDirective],
  templateUrl: './snakegame.html',
  styleUrl: './snakegame.css'
})

export class Snakegame implements OnDestroy{

  private intervalID = signal<NodeJS.Timeout | null>(null);
  public inGame = signal<boolean>(false);
  public inParty = signal<boolean>(false);
  public size = 16;
  public cells = computed(() => {
    return Array.from({ length: this.size * this.size }, (_,i) => i);
  })

  public snake = signal<number[]>([116,115,114]);
  public food = signal<number>(125);
  private direction = signal<'up' | 'down' | 'left' | 'right'>('right');

  public points = signal<number>(0);
  public timer = signal<number>(0);
  public apples = signal<number>(0);
  private TIMER_ID = signal<NodeJS.Timeout | null>(null);

  constructor(private toast: ToastManager, private gamesDB: GamesService) {}

  ngOnDestroy(): void {
    this.pause();
    this.restartGame();
  }

  @HostListener('window:keydown', ['$event']) toggleKey(event: KeyboardEvent) {
    const code = event.code;
    this.handleDirection(code);
  }

  private handleDirection(code: string) {
    if(this.validateKeyDown(code)) {
      switch(code) {
        case 'KeyW': this.direction.set('up'); break;
        case 'KeyS': this.direction.set('down'); break;
        case 'KeyD': this.direction.set('right'); break;
        case 'KeyA': this.direction.set('left'); break;
      }
    }
  }

  private validateKeyDown(code: string) {
    const direccion = keyDownDirecction[code];
    const oppositeDireccion = oppositesDirection[direccion];
    return (oppositeDireccion != this.direction());
  }

  private xyToIndex(x: number, y: number): number {
    return y * this.size + x;
  }
  
  private indexToXY(index: number): [number, number] {
    return [index % this.size, Math.floor(index / this.size)];
  }

  public start() {
    if(this.inGame()) return;
    
    this.inGame.set(true);
    this.inParty.set(true);
    const time_id = setInterval(() => {
      this.moveSnake();
    }, 200);
    this.intervalID.set(time_id);
    this.startTimer();
  }

  private startTimer() {
    const TIMER_INTERVAL_ID = setInterval(() => {
      this.timer.update(t => t + 1);
    }, 1000);

    this.TIMER_ID.set(TIMER_INTERVAL_ID);
  }

  private stopTimer() {
    clearInterval(this.TIMER_ID() as NodeJS.Timeout);
  }

  public pause() {
    this.inParty.set(false);
  
    const id = this.intervalID();
    if (id !== null) {
      clearInterval(id);
      this.intervalID.set(null);
    }
  
    const timerId = this.TIMER_ID();
    if (timerId !== null) {
      clearInterval(timerId);
      this.TIMER_ID.set(null);
    }
  }

  private stopGame() {
    this.toast.show("error", "Perdiste :(", true, 3000);
    this.saveStats();
    this.pause();
  }

  private generateRandomFood() {
    const max = this.size * this.size;
    let pos: number;
    do {
      pos = Math.floor(Math.random() * max);
    } while (this.snake().includes(pos));
    this.food.set(pos);
  }

  private moveSnake() {
    const head = this.snake()[0];
    const [x, y] = this.indexToXY(head);

    let newX = x;
    let newY = y;

    switch(this.direction()) {
      case "up":
        newY--;
        break;
      case "down":
        newY++;
        break;
      case "right":
        newX++;
        break;
      case "left":
        newX--;
        break;
    }

    if (newX < 0 || newX >= this.size || newY < 0 || newY >= this.size) {
      this.stopGame();
      return;
    }

    const newHead = this.xyToIndex(newX, newY);

    if (this.snake().includes(newHead)) {
      this.stopGame();
      return;
    }

    const newSnake = [newHead, ...this.snake()];

    if(newHead === this.food()) {
      this.generateRandomFood()
      this.addPoints();
      this.apples.update(m => m + 1);
    } else {
      newSnake.pop();
    }

    this.snake.set(newSnake);
    console.log(this.snake());
  }

  private addPoints() {
    this.points.update(p => p + 10);
    this.toast.show("success", "+10 PUNTOS!", true, 2000);
  }

  public restartGame() {
    this.inGame.set(false);
    this.inParty.set(false);
    this.snake.set([116,115,114]);
    this.food.set(125);
    this.direction.set('right');
    this.points.set(0);
    this.timer.set(0);
    this.apples.set(0);
  }

  public UpSnake() {
    this.handleDirection('KeyW');
  }
  
  public DownSnake() {
    this.handleDirection('KeyS');
  }
  
  public RightSnake() {
    this.handleDirection('KeyD');
  }
  
  public LeftSnake() {
    this.handleDirection('KeyA');
  }

  private saveStats() {
    this.gamesDB.insertStats(GamesType.snake_game, this.points(), false, {
      apples: this.apples(),
      time_playing: this.timer(),
      snake_len: this.snake().length
    })
  }
}
