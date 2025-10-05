import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  template: `
    <div class="login-container">
      <!-- Left side - Illustration -->
      <div class="illustration-section">
        <img
          src="desktop-illustration-x1.webp"
          alt="Learning illustration"
          class="illustration-image"
        />
      </div>

      <!-- Right side - Login Form -->
      <div class="form-section">
        <mat-card appearance="outlined" style="width: 100%; max-width: 400px;">
          <mat-card-header style="padding-bottom: 16px;">
            <mat-card-title>Sign in with email</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Email</mat-label>
                <input
                  matInput
                  type="email"
                  formControlName="email"
                  placeholder="Enter your email address"
                />
                <mat-icon matSuffix>email</mat-icon>
              </mat-form-field>

              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Password</mat-label>
                <input
                  matInput
                  type="password"
                  formControlName="password"
                  placeholder="Enter your password"
                />
                <mat-icon matSuffix>lock</mat-icon>
              </mat-form-field>

              <button
                mat-raised-button
                color="primary"
                type="submit"
                style="width: 100%; margin-top: 8px;"
                [disabled]="!loginForm.valid || authService.isLoading()"
              >
                @if (authService.isLoading()) {
                  <mat-spinner diameter="20" style="margin-right: 8px;"></mat-spinner>
                }
                Continue
              </button>
            </form>

            <mat-divider style="margin: 24px 0;">
              <span style="background-color: white; padding: 0 16px; font-size: 14px;"
                >Other sign-in options</span
              >
            </mat-divider>

            <div class="social-login">
              <button mat-stroked-button class="social-button">
                <mat-icon>login</mat-icon>
                Google
              </button>
              <button mat-stroked-button class="social-button">
                <mat-icon>facebook</mat-icon>
                Facebook
              </button>
              <button mat-stroked-button class="social-button">
                <mat-icon>apple</mat-icon>
                Apple
              </button>
            </div>
          </mat-card-content>

          <mat-card-actions style="text-align: center; padding: 16px;">
            <p style="margin: 0; font-size: 14px;">
              Don't have an account?
              <a
                routerLink="/register"
                style="color: #a435f0; text-decoration: none; font-weight: 600;"
                >Sign up</a
              >
            </p>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./login.scss'],
})
export class Login {
  private fb = inject(FormBuilder);

  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          this.snackBar.open('Login successful!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });

          // Redirect to dashboard or return URL
          const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        },
        error: (error) => {
          this.snackBar.open('Login failed. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          console.error('Login error:', error);
        },
      });
    }
  }
}
