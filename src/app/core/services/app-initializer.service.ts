import { Injectable, Injector } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
  constructor(private authService: AuthService) {}

  async initializeApp(): Promise<void> {
    const token = this.authService.getToken();

    if (token) {
      try {
        await this.authService.getMe();
      } catch (error) {
        console.warn('Failed to get user data on app initialization:', error);
        this.authService.logout();
      }
    }
  }
}

export function AppInitializerFactory(authService: AuthService, injector: Injector) {
  return () => {
    return new Promise<any>((resolve) => {
      const token = authService.getToken();

      if (token) {
        authService.getMe().subscribe({
          next: () => resolve(true),
          error: () => {
            authService.logout();
            resolve(true);
          },
        });
      } else {
        resolve(true);
      }
    });
  };
}
