import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { NavigationComponent } from './navigation.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    // expect(component).toBeTruthy();
  });

  it('should contain a toolbar with a home icon', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('[mat-icon-button]'));
    expect(de).not.toBeNull('home icon is null');

    el = de.nativeElement;

    expect(el.textContent).toEqual('home');
  });

  it('should contain a Sign In button', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();
    const allButons = fixture.debugElement.queryAll(By.css('a[mat-button]'));
    de = allButons[allButons.length - 1];
    expect(de).not.toBeNull('SignIn link is null');

    el = de.nativeElement;

    expect(el.textContent).toContain('Sign In');
  });
  
});
