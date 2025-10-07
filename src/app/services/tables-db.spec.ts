import { TestBed } from '@angular/core/testing';

import { TablesDB } from './tables-db';

describe('TablesDB', () => {
  let service: TablesDB;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablesDB);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
