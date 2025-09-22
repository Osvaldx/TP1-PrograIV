import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Snakegame } from './snakegame';

describe('Snakegame', () => {
  let component: Snakegame;
  let fixture: ComponentFixture<Snakegame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Snakegame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Snakegame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
