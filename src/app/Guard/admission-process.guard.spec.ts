import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { admissionProcessGuard } from './admission-process.guard';

describe('admissionProcessGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => admissionProcessGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
