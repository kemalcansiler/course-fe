import { Component, signal, ViewChild, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserMenu } from '../../../shared/components/user-menu/user-menu';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatSidenavContent,
    MatListModule,
    MatProgressSpinnerModule,
    RouterLink,
    UserMenu,
  ],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #mobileSidenav mode="over" position="start" class="mobile-sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/" (click)="closeMobileMenu()">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>

          @if (authService.isAuthenticated()) {
            <div class="mobile-user-section">
              <div class="mobile-user-info">
                <img
                  [src]="authService.currentUser()?.avatar || 'assets/default-avatar.png'"
                  [alt]="authService.currentUser()?.fullName"
                  class="mobile-user-avatar"
                  width="40"
                  height="40"
                />
                <div class="mobile-user-details">
                  <div class="mobile-user-name">{{ authService.currentUser()?.fullName }}</div>
                  <div class="mobile-user-email">{{ authService.currentUser()?.email }}</div>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <a mat-list-item (click)="onProfileClick(); closeMobileMenu()">
              <mat-icon matListItemIcon>person</mat-icon>
              <span matListItemTitle>Profile</span>
            </a>

            <mat-divider></mat-divider>

            <a mat-list-item (click)="onLogout(); closeMobileMenu()" class="logout-item">
              <mat-icon matListItemIcon>logout</mat-icon>
              <span matListItemTitle>Logout</span>
            </a>
          } @else {
            <a mat-list-item routerLink="login" (click)="closeMobileMenu()">
              <mat-icon matListItemIcon>login</mat-icon>
              <span matListItemTitle>Login</span>
            </a>
            <a mat-list-item routerLink="register" (click)="closeMobileMenu()">
              <mat-icon matListItemIcon>person_add</mat-icon>
              <span matListItemTitle>Register</span>
            </a>
          }
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar>
          <button matIconButton class="mobile-menu-button" (click)="toggleMobileMenu()">
            <mat-icon>menu</mat-icon>
          </button>

          <span style="cursor: pointer;" class="logo" routerLink="/">Course App</span>

          <span class="desktop-spacer"></span>

          @if (authService.isLoading()) {
            <mat-spinner diameter="24"></mat-spinner>
          } @else if (authService.isAuthenticated()) {
            <app-user-menu
              [user]="authService.currentUser()!"
              (logoutClick)="onLogout()"
            ></app-user-menu>
          } @else {
            <div class="desktop-nav">
              <button class="me-1" matButton="outlined" routerLink="login">Login</button>
              <button matButton="filled" routerLink="register">Register</button>
            </div>
          }
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

  authService = inject(AuthService);
  router = inject(Router);

  toggleMobileMenu() {
    this.mobileSidenav.toggle();
  }

  closeMobileMenu() {
    this.mobileSidenav.close();
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onProfileClick() {
    this.router.navigate(['/profile']);
  }
}
