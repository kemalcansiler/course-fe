import { Component, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-user-menu',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, MatChipsModule],
  template: `
    <button mat-button [matMenuTriggerFor]="userMenu" class="user-menu-button">
      <div class="user-info">
        <img
          [src]="user().avatar || 'assets/default-avatar.png'"
          [alt]="user().fullName"
          class="user-avatar"
          width="32"
          height="32"
        />
        <span class="user-name">{{ user().fullName }}</span>
        <mat-icon>arrow_drop_down</mat-icon>
      </div>
    </button>

    <mat-menu #userMenu="matMenu" class="user-menu">
      <div class="menu-header">
        <div class="user-details">
          <img
            [src]="user().avatar || 'assets/default-avatar.png'"
            [alt]="user().fullName"
            class="menu-avatar"
            width="40"
            height="40"
          />
          <div class="user-info user-info-direction">
            <div class="user-name">{{ user().fullName }}</div>
            <div class="user-email">{{ user().email }}</div>
          </div>
        </div>
      </div>

      <mat-divider></mat-divider>

      <button mat-menu-item (click)="onProfileClick()">
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </button>

      <mat-divider></mat-divider>

      <button mat-menu-item (click)="onLogoutClick()" class="logout-button">
        <mat-icon>logout</mat-icon>
        <span>Logout</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .user-menu-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        border-radius: 20px;
        background-color: #f5f5f5;
        transition: background-color 0.2s;
      }

      .user-menu-button:hover {
        background-color: #e0e0e0;
      }

      .user-info {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .user-avatar {
        border-radius: 50%;
        object-fit: cover;
      }

      .user-name {
        font-weight: 500;
        color: #333;
      }

      .menu-header {
        padding: 16px;
        background-color: #f8f9fa;
      }

      .user-details {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .menu-avatar {
        border-radius: 50%;
        object-fit: cover;
      }

      .user-info .user-name {
        font-weight: 600;
        color: #333;
        margin-bottom: 2px;
      }

      .user-info-direction {
        flex-direction: column;
        align-items: flex-start;
        gap: 0;
      }

      .user-info .user-email {
        font-size: 12px;
        color: #666;
      }

      .logout-button {
        color: #d32f2f;
      }

      .logout-button:hover {
        background-color: #ffebee;
      }
    `,
  ],
})
export class UserMenu {
  user = input.required<User>();
  profileClick = output<void>();
  logoutClick = output<void>();

  private router = inject(Router);

  onProfileClick() {
    this.profileClick.emit();
    this.router.navigate(['/profile']);
  }

  onLogoutClick() {
    this.logoutClick.emit();
  }
}
