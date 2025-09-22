import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoSprite } from './ahorcado-sprite';

describe('AhorcadoSprite', () => {
  let component: AhorcadoSprite;
  let fixture: ComponentFixture<AhorcadoSprite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AhorcadoSprite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoSprite);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
