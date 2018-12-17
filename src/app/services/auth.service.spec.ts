import { TestBed, async } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { RouterTestingModule } from '@angular/router/testing';

export class Auth0Mock {
  public show() {
    console.log('show called');
  }
}

describe('AuthService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('login should call lock show method', () => {
    const service: AuthService = TestBed.get(AuthService);
    spyOn(service.lock, 'show');
    service.login();

    expect(service.lock.show).toHaveBeenCalled();
  });
});
