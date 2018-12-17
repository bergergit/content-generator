import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MatCardModule, MatCardTitle } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

export class AuthServiceMock {
  isAuthenticated() {
    return false;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule
      ],
      providers: [
        
        { provide: AuthService, useClass: AuthServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a mat-card-title title', () => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    const compiled: HTMLElement = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-title').textContent).toContain('Welcome');
  });

  it('should display Please Sign In to authenticated users', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('mat-card-content').textContent).toContain('sign in');
  });


  it('should NOT display Please Sign In to authenticated users', () => {
    const service: AuthService = TestBed.get(AuthService);
    spyOn(service, 'isAuthenticated').and.returnValue(true);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('mat-card-content')).toBeNull();
  });
});
