import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { otentikasiGuard } from './otentikasi-guard';

describe('otentikasiGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => otentikasiGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
