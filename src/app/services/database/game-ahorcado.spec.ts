import { TestBed } from '@angular/core/testing';

import { GameAhorcado } from './game-ahorcado';

describe('GameAhorcado', () => {
  let service: GameAhorcado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameAhorcado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
