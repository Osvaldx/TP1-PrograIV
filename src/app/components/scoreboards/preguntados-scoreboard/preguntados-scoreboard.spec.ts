import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosScoreboard } from './preguntados-scoreboard';

describe('PreguntadosScoreboard', () => {
  let component: PreguntadosScoreboard;
  let fixture: ComponentFixture<PreguntadosScoreboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreguntadosScoreboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntadosScoreboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
