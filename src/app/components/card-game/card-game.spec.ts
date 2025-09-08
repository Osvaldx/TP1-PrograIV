import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGame } from './card-game';

describe('CardGame', () => {
  let component: CardGame;
  let fixture: ComponentFixture<CardGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
