import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { adminsOnlyGuard } from './admins-only.guard';

describe('adminsOnlyGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminsOnlyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
