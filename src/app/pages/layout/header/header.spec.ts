import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { Header } from './header';
import { AuthService } from '../../../core/services/auth.service';
import { signal, WritableSignal } from '@angular/core';

describe('Header Component', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let isAuthenticatedSignal: WritableSignal<boolean>;
  let currentUserSignal: WritableSignal<any>;

  const mockUser = {
    id: '1',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    profileImageUrl: 'avatar.jpg',
    dateOfBirth: null,
    bio: null,
    createdAt: new Date().toISOString()
  };

  beforeEach(async () => {
    isAuthenticatedSignal = signal(false);
    currentUserSignal = signal(null);
    
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout'], {
      isAuthenticated: isAuthenticatedSignal.asReadonly(),
      currentUser: currentUserSignal.asReadonly()
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: new Subject()
    });
    routerSpy.createUrlTree.and.returnValue({} as any);
    routerSpy.serializeUrl.and.returnValue('/');

    await TestBed.configureTestingModule({
      imports: [
        Header,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu', () => {
    spyOn(component.mobileSidenav, 'toggle');
    component.toggleMobileMenu();
    expect(component.mobileSidenav.toggle).toHaveBeenCalled();
  });

  it('should close mobile menu', () => {
    spyOn(component.mobileSidenav, 'close');
    component.closeMobileMenu();
    expect(component.mobileSidenav.close).toHaveBeenCalled();
  });

  it('should logout and navigate to login', () => {
    component.onLogout();
    
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to profile', () => {
    component.onProfileClick();
    expect(router.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should display user info when authenticated', () => {
    isAuthenticatedSignal.set(true);
    currentUserSignal.set(mockUser);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('John');
    expect(compiled.textContent).toContain('Doe');
  });

  it('should display login/register buttons when not authenticated', () => {
    isAuthenticatedSignal.set(false);
    currentUserSignal.set(null);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const buttons = compiled.querySelectorAll('button');
    const buttonTexts = Array.from(buttons).map((btn: any) => btn.textContent?.trim());
    
    expect(buttonTexts.some((text: string) => text.includes('Login'))).toBe(true);
    expect(buttonTexts.some((text: string) => text.includes('Register'))).toBe(true);
  });
});

