import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError, Subject } from 'rxjs';
import { Register } from './register';
import { AuthService } from '../../../core/services/auth.service';
import { AuthResponse } from '../../../core/models/user.model';

describe('Register Component', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register'], {
      isLoading: jasmine.createSpy().and.returnValue(false)
    });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: new Subject()
    });
    routerSpy.createUrlTree.and.returnValue({} as any);
    routerSpy.serializeUrl.and.returnValue('/');
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [
        Register,
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

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.registerForm.get('firstName')?.value).toBe('');
    expect(component.registerForm.get('lastName')?.value).toBe('');
    expect(component.registerForm.get('email')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('confirmPassword')?.value).toBe('');
  });

  it('should validate first name field', () => {
    const firstNameControl = component.registerForm.get('firstName');
    
    firstNameControl?.setValue('');
    expect(firstNameControl?.hasError('required')).toBe(true);
    
    firstNameControl?.setValue('J');
    expect(firstNameControl?.hasError('minlength')).toBe(true);
    
    firstNameControl?.setValue('John');
    expect(firstNameControl?.valid).toBe(true);
  });

  it('should validate last name field', () => {
    const lastNameControl = component.registerForm.get('lastName');
    
    lastNameControl?.setValue('');
    expect(lastNameControl?.hasError('required')).toBe(true);
    
    lastNameControl?.setValue('D');
    expect(lastNameControl?.hasError('minlength')).toBe(true);
    
    lastNameControl?.setValue('Doe');
    expect(lastNameControl?.valid).toBe(true);
  });

  it('should validate email field', () => {
    const emailControl = component.registerForm.get('email');
    
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBe(true);
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
    
    emailControl?.setValue('valid@email.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should validate password strength', () => {
    const passwordControl = component.registerForm.get('password');
    
    passwordControl?.setValue('weak');
    expect(passwordControl?.hasError('passwordStrength')).toBe(true);
    
    passwordControl?.setValue('12345678');
    expect(passwordControl?.hasError('passwordStrength')).toBe(true);
    
    passwordControl?.setValue('Password123!');
    expect(passwordControl?.valid).toBe(true);
  });

  it('should validate password match', () => {
    component.registerForm.patchValue({
      password: 'Password123!',
      confirmPassword: 'DifferentPassword123!'
    });
    
    expect(component.registerForm.get('confirmPassword')?.hasError('passwordMismatch')).toBe(true);
    expect(component.registerForm.hasError('passwordMismatch')).toBe(true);
  });

  it('should pass validation when passwords match', () => {
    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });
    
    expect(component.registerForm.valid).toBe(true);
  });

  it('should not submit when form is invalid', () => {
    component.registerForm.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    component.onSubmit();

    expect(authService.register).not.toHaveBeenCalled();
  });

  it('should submit and navigate on successful registration', fakeAsync(() => {
    const mockResponse: AuthResponse = {
      token: 'test-token',
      refreshToken: 'refresh-token',
      user: {
        id: '1',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        profileImageUrl: null,
        dateOfBirth: null,
        bio: null,
        createdAt: new Date().toISOString()
      }
    };

    authService.register.and.returnValue(of(mockResponse));

    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });

    component.onSubmit();
    fixture.detectChanges();
    flush(); // Wait for all async operations to complete

    expect(authService.register).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });
  }));

  it('should show error on failed registration', fakeAsync(() => {
    authService.register.and.returnValue(
      throwError(() => new Error('Registration failed'))
    );

    component.registerForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });

    component.onSubmit();
    fixture.detectChanges();
    flush(); // Wait for all async operations to complete

    expect(authService.register).toHaveBeenCalled();
  }));

  it('should test password strength validator directly', () => {
    const validator = component.passwordStrengthValidator;
    
    expect(validator({ value: '' })).toBeNull();
    expect(validator({ value: 'weak' })).toEqual({ passwordStrength: true });
    expect(validator({ value: '12345678' })).toEqual({ passwordStrength: true });
    expect(validator({ value: 'Abcdefgh' })).toEqual({ passwordStrength: true });
    expect(validator({ value: 'Password123!' })).toBeNull();
  });

  it('should test password match validator directly', () => {
    const formGroup = component.registerForm;
    formGroup.patchValue({
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });
    
    const result = component.passwordMatchValidator(formGroup);
    expect(result).toBeNull();
  });
});

