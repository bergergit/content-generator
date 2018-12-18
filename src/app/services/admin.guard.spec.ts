import { TestBed, async, inject, getTestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

export class AuthServiceMock {
  isAdmin: boolean = false;
}

class RouterMock {
  navigate(path: string[]) {}
}

describe('AdminGuard', () => {
  let injector: TestBed;
  let guard: AdminGuard;
  let authService: AuthService;
  let router: RouterMock;
  
  let fakeState = {
    state: { 
      url: ''
    }
  } as any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useClass: AuthServiceMock },
        { provide: Router, useClass: RouterMock},
        AdminGuard
      ]
      
    });

    guard = TestBed.get(AdminGuard);
    authService = TestBed.get(AuthService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should not allow a non-Admin', () => {
    expect(authService).toBeTruthy();
    expect(guard.canActivate(null, fakeState)).toBeFalsy();
  });

  it('should redirect to root if not an Admin', () => {
    spyOn(router, 'navigate');

    expect(guard.canActivate(null, fakeState)).toBeFalsy();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
