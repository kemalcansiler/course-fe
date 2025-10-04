import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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

              <button
                mat-raised-button
                color="primary"
                type="submit"
                style="width: 100%; margin-top: 8px;"
                [disabled]="!loginForm.valid"
              >
                Continue
              </button>
            </form>

            <mat-divider style="margin: 24px 0;">
              <span style="background-color: white; padding: 0 16px; font-size: 14px;">Other sign-in options</span>
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
              Don't have an account? <a routerLink="/register" style="color: #a435f0; text-decoration: none; font-weight: 600;">Sign up</a>
            </p>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./login.scss'],
})
export class Login {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login form submitted:', this.loginForm.value);
      // Handle login logic here
    }
  }
}
