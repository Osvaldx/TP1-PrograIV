import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnakegameScoreboard } from './snakegame-scoreboard';

describe('SnakegameScoreboard', () => {
  let component: SnakegameScoreboard;
  let fixture: ComponentFixture<SnakegameScoreboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakegameScoreboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnakegameScoreboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
