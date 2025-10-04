import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './pages/layout/header/header';
import { Footer } from './pages/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header>
      <router-outlet />
    </app-header>
    <app-footer />
  `,
})
export class App {}
