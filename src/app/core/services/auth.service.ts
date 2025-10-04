import { Injectable, signal, computed } from '@angular/core';
import {
  User,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  MeResponse,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // Signals for reactive state management
  private _isAuthenticated = signal<boolean>(false);
  private _currentUser = signal<User | null>(null);
  private _isLoading = signal<boolean>(false);

  // Public computed signals
  isAuthenticated = computed(() => this._isAuthenticated());
  currentUser = computed(() => this._currentUser());
  isLoading = computed(() => this._isLoading());

  constructor() {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state from sessionStorage
   */
  private initializeAuth(): void {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    const userData = sessionStorage.getItem(this.USER_KEY);

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        this._currentUser.set(user);
        this._isAuthenticated.set(true);
      } catch (error) {
        console.error('Error parsing user data from sessionStorage:', error);
        this.clearAuthData();
      }
    }
  }

  /**
   * Mock login method - simulates API call
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    this._isLoading.set(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation - in real app, this would be an API call
      if (!credentials.email || !credentials.email.includes('@')) {
        throw new Error('Invalid email address');
      }

      // Mock user data
      const mockUser: User = {
        id: this.generateId(),
        email: credentials.email,
        fullName: this.extractNameFromEmail(credentials.email),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(this.extractNameFromEmail(credentials.email))}&background=random`,
        createdAt: new Date(),
      };

      const mockToken = this.generateMockToken();
      const response: AuthResponse = {
        token: mockToken,
        user: mockUser,
      };

      // Store in sessionStorage
      sessionStorage.setItem(this.TOKEN_KEY, mockToken);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));

      // Update signals
      this._currentUser.set(mockUser);
      this._isAuthenticated.set(true);

      return response;
    } catch (error) {
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Mock register method - simulates API call
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    this._isLoading.set(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock validation
      if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email address');
      }

      if (!userData.fullName || userData.fullName.length < 2) {
        throw new Error('Full name must be at least 2 characters');
      }

      // Mock user data
      const mockUser: User = {
        id: this.generateId(),
        email: userData.email,
        fullName: userData.fullName,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.fullName)}&background=random`,
        createdAt: new Date(),
      };

      const mockToken = this.generateMockToken();
      const response: AuthResponse = {
        token: mockToken,
        user: mockUser,
      };

      // Store in sessionStorage
      sessionStorage.setItem(this.TOKEN_KEY, mockToken);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));

      // Update signals
      this._currentUser.set(mockUser);
      this._isAuthenticated.set(true);

      return response;
    } catch (error) {
      throw error;
    } finally {
      this._isLoading.set(false);
    }
  }

  /**
   * Mock me method - simulates getting current user data
   */
  async getMe(): Promise<MeResponse> {
    this._isLoading.set(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const token = sessionStorage.getItem(this.TOKEN_KEY);
      if (!token) {
        throw new Error('No authentication token found');
      }

      const userData = sessionStorage.getItem(this.USER_KEY);
      if (!userData) {
        throw new Error('No user data found');
      }

      const user = JSON.parse(userData);

      // Update signals
      this._currentUser.set(user);
      this._isAuthenticated.set(true);

      return { user };
    } catch (error) {
      this.clearAuthData();
      throw error;
    } finally {
      this._isLoading.set(false);
    }
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
    sessionStorage.removeItem(this.USER_KEY);
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
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

  // Helper methods for mock data generation
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private generateMockToken(): string {
    return 'mock_token_' + Math.random().toString(36).substr(2, 9);
  }

  private extractNameFromEmail(email: string): string {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
