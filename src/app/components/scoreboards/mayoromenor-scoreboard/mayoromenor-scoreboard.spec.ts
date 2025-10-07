import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoromenorScoreboard } from './mayoromenor-scoreboard';

describe('MayoromenorScoreboard', () => {
  let component: MayoromenorScoreboard;
  let fixture: ComponentFixture<MayoromenorScoreboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MayoromenorScoreboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayoromenorScoreboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
