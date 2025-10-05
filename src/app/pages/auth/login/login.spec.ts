import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError, Subject } from 'rxjs';
import { Login } from './login';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/user.model';

describe('Login Component', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login'], {
      isLoading: jasmine.createSpy().and.returnValue(false)
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'parseUrl', 'createUrlTree', 'serializeUrl'], {
      events: new Subject()
    });
    routerSpy.createUrlTree.and.returnValue({} as any);
    routerSpy.serializeUrl.and.returnValue('/');
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        Login,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackBar = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
    
    // Setup router.parseUrl mock
    router.parseUrl.and.returnValue({ queryParams: {} } as any);

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should validate email field', () => {
    const emailControl = component.loginForm.get('email');
    
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBe(true);
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should validate password field', () => {
    const passwordControl = component.loginForm.get('password');
    
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBe(true);
    
    passwordControl?.setValue('short');
    expect(passwordControl?.hasError('minlength')).toBe(true);
    
    passwordControl?.setValue('password123');
    expect(passwordControl?.valid).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.loginForm.patchValue({
      email: '',
      password: ''
    });

    component.onSubmit();

    expect(authService.login).not.toHaveBeenCalled();
  });

  it('should submit and navigate on successful login', fakeAsync(() => {
    const mockResponse: AuthResponse = {
      token: 'test-token',
      refreshToken: 'refresh-token',
      user: {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        profileImageUrl: null,
        dateOfBirth: null,
        bio: null,
        createdAt: new Date().toISOString()
      }
    };

    authService.login.and.returnValue(of(mockResponse));

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });

    component.onSubmit();
    fixture.detectChanges();
    flush(); // Wait for all async operations to complete

    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  }));

  it('should show error on failed login', fakeAsync(() => {
    authService.login.and.returnValue(
      throwError(() => new Error('Invalid credentials'))
    );

    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'wrongpassword'
    });

    component.onSubmit();
    fixture.detectChanges();
    flush(); // Wait for all async operations to complete

    expect(authService.login).toHaveBeenCalled();
  }));

  it('should disable submit button when form is invalid', () => {
    component.loginForm.patchValue({
      email: '',
      password: ''
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(true);
  });

  it('should enable submit button when form is valid', () => {
    component.loginForm.patchValue({
      email: 'test@example.com',
      password: 'password123'
    });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBe(false);
  });
});

