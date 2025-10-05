import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { ApiService } from './api.service';
import { AuthResponse, LoginRequest, RegisterRequest, MeResponse } from '../models/user.model';

describe('AuthService', () => {
  let service: AuthService;
  let apiService: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ApiService]
    });
    service = TestBed.inject(AuthService);
    apiService = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    
    // Clear sessionStorage before each test
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully and store token', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

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

      service.login(loginRequest).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(sessionStorage.getItem('auth_token')).toBe('test-token');
          expect(sessionStorage.getItem('refresh_token')).toBe('refresh-token');
          expect(service.isAuthenticated()).toBe(true);
          expect(service.currentUser()?.email).toBe('test@example.com');
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('auth/login')
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });

    it('should handle login error', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      service.login(loginRequest).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          expect(service.isAuthenticated()).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('auth/login')
      );
      req.error(new ProgressEvent('error'));
    });
  });

  describe('register', () => {
    it('should register successfully', (done) => {
      const registerRequest: RegisterRequest = {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'password123',
        confirmPassword: 'password123'
      };

      const mockResponse: AuthResponse = {
        token: 'test-token',
        refreshToken: 'refresh-token',
        user: {
          id: '1',
          email: 'jane@example.com',
          firstName: 'Jane',
          lastName: 'Doe',
          profileImageUrl: null,
          dateOfBirth: null,
          bio: null,
          createdAt: new Date().toISOString()
        }
      };

      service.register(registerRequest).subscribe({
        next: (response) => {
          expect(response).toEqual(mockResponse);
          expect(sessionStorage.getItem('auth_token')).toBe('test-token');
          expect(service.isAuthenticated()).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('auth/register')
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('getMe', () => {
    it('should fetch current user data', (done) => {
      const mockUser: MeResponse = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        profileImageUrl: null,
        dateOfBirth: null,
        bio: null,
        createdAt: new Date().toISOString()
      };

      service.getMe().subscribe({
        next: (user) => {
          expect(user).toEqual(mockUser);
          expect(service.currentUser()?.email).toBe('test@example.com');
          expect(service.isAuthenticated()).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('auth/me')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockUser);
    });

    it('should clear auth data on error', (done) => {
      sessionStorage.setItem('auth_token', 'test-token');

      service.getMe().subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          expect(sessionStorage.getItem('auth_token')).toBeNull();
          expect(service.isAuthenticated()).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('auth/me')
      );
      req.error(new ProgressEvent('error'));
    });
  });

  describe('logout', () => {
    it('should clear all auth data', () => {
      sessionStorage.setItem('auth_token', 'test-token');
      sessionStorage.setItem('refresh_token', 'refresh-token');

      service.logout();

      expect(sessionStorage.getItem('auth_token')).toBeNull();
      expect(sessionStorage.getItem('refresh_token')).toBeNull();
      expect(service.isAuthenticated()).toBe(false);
      expect(service.currentUser()).toBeNull();
    });
  });

  describe('getToken', () => {
    it('should return token from sessionStorage', () => {
      sessionStorage.setItem('auth_token', 'test-token');
      expect(service.getToken()).toBe('test-token');
    });

    it('should return null if no token exists', () => {
      expect(service.getToken()).toBeNull();
    });
  });

  describe('isLoggedIn', () => {
    it('should return false initially', () => {
      expect(service.isLoggedIn()).toBe(false);
    });

    it('should return true when authenticated', (done) => {
      const loginRequest: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

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

      service.login(loginRequest).subscribe({
        next: () => {
          expect(service.isLoggedIn()).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('auth/login')
      );
      req.flush(mockResponse);
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      service.clearError();
      expect(service.error()).toBeNull();
    });
  });

  describe('updateCurrentUser', () => {
    it('should update current user', () => {
      const user = {
        id: '1',
        email: 'updated@example.com',
        firstName: 'Updated',
        lastName: 'User',
        profileImageUrl: null,
        dateOfBirth: null,
        bio: null,
        createdAt: new Date().toISOString()
      };

      service.updateCurrentUser(user);
      expect(service.currentUser()?.email).toBe('updated@example.com');
    });
  });
});

