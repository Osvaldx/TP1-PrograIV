import { TestBed } from '@angular/core/testing';

import { RandomWord } from './random-word';

describe('RandomWord', () => {
  let service: RandomWord;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomWord);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
