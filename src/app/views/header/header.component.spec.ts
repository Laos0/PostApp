import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes';
import { AuthService } from 'src/app/services/auth-service/auth-service';
import { AuthServiceMock } from 'src/app/services/auth-service/auth-service-mock';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: AuthServiceMock; // custom service
  let routerMock: {}; // native services

  beforeEach(async () => {
    authServiceMock = new AuthServiceMock();
    routerMock = jasmine.createSpyObj<Router>('routerMock', ["navigate"]);

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('logout', () => {

    it('should call sessionStorage.clear()', () => {
      const clearSpy: jasmine.Spy = spyOn(sessionStorage, 'clear');
      component.logout();
      expect(clearSpy).toHaveBeenCalledTimes(1);
    });

    it('should call call authService.logoutSuccess', () => {
      component.logout();
      expect(authServiceMock.logoutSuccess).toHaveBeenCalledTimes(1);
    });
    
  });
  
  describe('returnToHome', () => {
    
    it('should call router.navigate', () => {
      component.returnToHome();
      expect(routerMock["navigate"]).toHaveBeenCalled(); 
      expect(routerMock["navigate"]).toHaveBeenCalledWith([AppRoutes.HOME]);
    });
  });

});

