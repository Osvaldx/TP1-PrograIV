import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesLayout } from './games-layout';

describe('GamesLayout', () => {
  let component: GamesLayout;
  let fixture: ComponentFixture<GamesLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamesLayout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamesLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
