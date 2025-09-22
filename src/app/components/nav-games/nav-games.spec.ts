import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavGames } from './nav-games';

describe('NavGames', () => {
  let component: NavGames;
  let fixture: ComponentFixture<NavGames>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavGames]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavGames);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
