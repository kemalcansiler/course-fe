import { AuthService } from './auth.service';

export function AppInitializerFactory(authService: AuthService) {
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
