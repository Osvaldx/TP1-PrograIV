import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoScoreboard } from './ahorcado-scoreboard';

describe('AhorcadoScoreboard', () => {
  let component: AhorcadoScoreboard;
  let fixture: ComponentFixture<AhorcadoScoreboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoScoreboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoScoreboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
