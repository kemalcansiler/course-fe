import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  provideAppInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { inject, Injector } from '@angular/core';

import { routes } from './app.routes';
import { AppInitializerFactory } from './core/services/app-initializer.service';
import { AuthService } from './core/services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAppInitializer(() => {
      const initializerFn = AppInitializerFactory(
        inject(AuthService),
        inject(Injector)
      );
      return initializerFn();
    }),
  ],
};
