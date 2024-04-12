import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { selleroradminGuard } from './selleroradmin.guard';

describe('selleroradminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => selleroradminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
