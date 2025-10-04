import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
  constructor(private authService: AuthService) {}

  async initializeApp(): Promise<void> {
    const token = this.authService.getToken();

    if (token) {
      try {
        // Try to get current user data if token exists
        await this.authService.getMe();
      } catch (error) {
        console.warn('Failed to get user data on app initialization:', error);
        // Token might be invalid, clear auth data
        this.authService.logout();
      }
    }
  }
}

export function AppInitializerFactory(
  authService: AuthService,
  injector: Injector
) {
  return () =>
    new Promise<any>((resolve, reject) => {
      function initializeApp() {
        const token = authService.getToken();

        if (token) {
          try {
            // Try to get current user data if token exists
            authService.getMe()
              .then(() => resolve(true))
              .catch(err => {
                console.warn('Failed to get user data on app initialization:', err);
                // Token might be invalid, clear auth data
                authService.logout();
                resolve(true); // Continue app initialization even if auth fails
              });
          } catch (error) {
            console.warn('Auth initialization error:', error);
            authService.logout();
            resolve(true);
          }
        } else {
          resolve(true);
        }
      }

      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));

      locationInitialized.then(() => {
        if (authService.isAuthenticated()) {
          runInInjectionContext(injector, () => {
            initializeApp();
          });
        } else {
          initializeApp();
        }
      });
    });
}
