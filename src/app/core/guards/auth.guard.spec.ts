import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authGuard, guestGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('Auth Guards', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let mockRoute: ActivatedRouteSnapshot;
  let mockState: RouterStateSnapshot;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockRoute = {} as ActivatedRouteSnapshot;
    mockState = { url: '/dashboard' } as RouterStateSnapshot;
  });

  describe('authGuard', () => {
    it('should allow access when user is authenticated', () => {
      authService.isLoggedIn.and.returnValue(true);

      const result = TestBed.runInInjectionContext(() => 
        authGuard(mockRoute, mockState)
      );

      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should redirect to login when user is not authenticated', () => {
      authService.isLoggedIn.and.returnValue(false);

      const result = TestBed.runInInjectionContext(() => 
        authGuard(mockRoute, mockState)
      );

      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(
        ['/login'],
        { queryParams: { returnUrl: '/dashboard' } }
      );
    });
  });

  describe('guestGuard', () => {
    it('should allow access when user is not authenticated', () => {
      authService.isLoggedIn.and.returnValue(false);

      const result = TestBed.runInInjectionContext(() => 
        guestGuard(mockRoute, mockState)
      );

      expect(result).toBe(true);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should redirect to home when user is already authenticated', () => {
      authService.isLoggedIn.and.returnValue(true);

      const result = TestBed.runInInjectionContext(() => 
        guestGuard(mockRoute, mockState)
      );

      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/']);
    });
  });
});

