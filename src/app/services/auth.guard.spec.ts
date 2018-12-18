import { TestBed, async, inject, getTestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

export class AuthServiceMock {
  tokenValid: boolean = false;
  loggedIn: boolean = false;
}

describe('AuthGuard', () => {
  let injector: TestBed;
  let guard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: AuthServiceMock }
      ],
      imports: [
        RouterTestingModule
      ]
    });

    injector = getTestBed();
    guard = injector.get(AuthGuard);
    authService = injector.get(AuthService);

  });

  // it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  //it('should return false if user not logged in', inject([AuthServiceMockSignedOut], (authService: AuthService) => {
  it('should return false if user not logged in', () => {
    expect(authService).toBeTruthy();
    spyOn(authService, 'tokenValid').and.returnValue(false);
    let fakeState = {
      state: { 
        url: ''
      }
    } as any;

    expect(guard.canActivate(null, fakeState)).toBeFalsy();
  });

    //it('should return false if user not logged in', inject([AuthServiceMockSignedOut], (authService: AuthService) => {
    it('should return true if user is logged in and active', () => {
        expect(authService).toBeTruthy();
        spyOn(authService, 'tokenValid').and.returnValue(true);
        spyOn(authService, 'loggedIn').and.returnValue(true);
        let fakeState = {
          state: { 
            url: ''
          }
        } as any;
    
        expect(guard.canActivate(null, fakeState)).toBeTruthy();
      });
});
