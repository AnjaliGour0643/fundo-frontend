import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { Router } from '@angular/router';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: Router, useValue: spy },
      ],
    });

    service = TestBed.inject(AuthGuardService);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when token exists in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('valid-token');
    const result = service.canActivate();
    expect(result).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should return false and navigate to "/" when token does not exist in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    const result = service.canActivate();
    expect(result).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call localStorage.getItem with "token"', () => {
    const getItemSpy = spyOn(localStorage, 'getItem').and.returnValue('valid-token');
    service.canActivate();
    expect(getItemSpy).toHaveBeenCalledWith('token');
  });

  it('should navigate only once when token is absent', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    service.canActivate();
    expect(routerSpy.navigate).toHaveBeenCalledTimes(1);
  });

  it('should not navigate when token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('valid-token');
    service.canActivate();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
