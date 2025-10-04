import { Component, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSidenavContent,
    MatListModule,
    RouterLink,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #mobileSidenav mode="over" position="start" class="mobile-sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="closeMobileMenu()">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a mat-list-item routerLink="login" (click)="closeMobileMenu()">
            <mat-icon matListItemIcon>login</mat-icon>
            <span matListItemTitle>Login</span>
          </a>
          <a mat-list-item routerLink="register" (click)="closeMobileMenu()">
            <mat-icon matListItemIcon>person_add</mat-icon>
            <span matListItemTitle>Register</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar>
          <button matIconButton class="mobile-menu-button" (click)="toggleMobileMenu()">
            <mat-icon>menu</mat-icon>
          </button>

          <span style="cursor: pointer;" class="logo" routerLink="/">Course App</span>

          <span class="desktop-spacer"></span>
          <div class="desktop-nav">
            <button class="me-1" matButton="outlined" routerLink="login">Login</button>
            <button matButton="filled" routerLink="register">Register</button>
          </div>
        </mat-toolbar>

        <main class="main-content">
          <ng-content></ng-content>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./header.scss'],
})
export class Header {
  @ViewChild('mobileSidenav') mobileSidenav!: MatSidenav;

  toggleMobileMenu() {
    this.mobileSidenav.toggle();
  }

  closeMobileMenu() {
    this.mobileSidenav.close();
  }
}
