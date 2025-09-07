import { TestBed } from '@angular/core/testing';

import { ToastManager } from './toast-manager';

describe('ToastManager', () => {
  let service: ToastManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
