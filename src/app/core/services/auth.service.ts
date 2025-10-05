import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  MeResponse,
} from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiService);

  private readonly TOKEN_KEY = 'auth_token';

  // Signals for reactive state management
  private _isAuthenticated = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public computed signals
  isAuthenticated = computed(() => this._isAuthenticated());
  currentUser = computed(() => this._currentUser());
  isLoading = computed(() => this._isLoading());
  error = computed(() => this._error());

  /**
   * Login method - calls real API
   */
  login(credentials: LoginRequest): Observable<AuthResponse> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.apiService.post<AuthResponse>('auth/login', credentials).pipe(
      tap((response) => {
        // Store tokens in sessionStorage
        sessionStorage.setItem(this.TOKEN_KEY, response.token);
        if (response.refreshToken) {
          sessionStorage.setItem('refresh_token', response.refreshToken);
        }

        // Update signals
        this._currentUser.set(response.user);
        this._isAuthenticated.set(true);
        this._isLoading.set(false);
      }),
      catchError((error) => {
        this._isLoading.set(false);
        this._error.set(error.message);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Register method - calls real API
   */
  register(userData: RegisterRequest): Observable<AuthResponse> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.apiService.post<AuthResponse>('auth/register', userData).pipe(
      tap((response) => {
        // Store tokens in sessionStorage
        sessionStorage.setItem(this.TOKEN_KEY, response.token);
        if (response.refreshToken) {
          sessionStorage.setItem('refresh_token', response.refreshToken);
        }

        // Update signals
        this._currentUser.set(response.user);
        this._isAuthenticated.set(true);
        this._isLoading.set(false);
      }),
      catchError((error) => {
        this._isLoading.set(false);
        this._error.set(error.message);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Get current user data from API
   */
  getMe(): Observable<MeResponse> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.apiService.get<MeResponse>('auth/me').pipe(
      tap((user) => {
        // Update signals - response is the user object directly
        this._currentUser.set(user);
        this._isAuthenticated.set(true);
        this._isLoading.set(false);
      }),
      catchError((error) => {
        this._isLoading.set(false);
        this._error.set(error.message);
        this.clearAuthData();
        return throwError(() => error);
      }),
    );
  }

  /**
   * Refresh authentication token
   */
  refreshToken(): Observable<AuthResponse> {
    const refreshToken = sessionStorage.getItem('refresh_token');
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.apiService.post<AuthResponse>('auth/refresh', { refreshToken }).pipe(
      tap((response) => {
        // Update stored tokens
        sessionStorage.setItem(this.TOKEN_KEY, response.token);
        if (response.refreshToken) {
          sessionStorage.setItem('refresh_token', response.refreshToken);
        }

        // Update signals
        this._currentUser.set(response.user);
        this._isAuthenticated.set(true);
      }),
      catchError((error) => {
        this.clearAuthData();
        return throwError(() => error);
      }),
    );
  }

  /**
   * Logout user
   */
  logout(): void {
    this.clearAuthData();
  }

  /**
   * Clear authentication data
   */
  private clearAuthData(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem('refresh_token');
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    this._error.set(null);
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Check if user is authenticated
   */
  isLoggedIn(): boolean {
    return this._isAuthenticated();
  }

  /**
   * Update current user data
   */
  updateCurrentUser(user: User): void {
    this._currentUser.set(user);
  }
}
