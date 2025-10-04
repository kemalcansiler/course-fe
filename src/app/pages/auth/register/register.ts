import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  template: `
    <div class="register-container">
      <!-- Left side - Illustration -->
      <div class="illustration-section">
        <img
          src="desktop-illustration-x1.webp"
          alt="Learning illustration"
          class="illustration-image"
        />
      </div>

      <!-- Right side - Register Form -->
      <div class="form-section">
        <mat-card appearance="outlined" style="width: 100%; max-width: 400px;">
          <mat-card-header style="padding-bottom: 16px;">
            <mat-card-title>Sign up with email</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Full name</mat-label>
                <input
                  matInput
                  type="text"
                  formControlName="fullName"
                  placeholder="Enter your full name"
                />
                <mat-icon matSuffix>person</mat-icon>
              </mat-form-field>

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
                [disabled]="!registerForm.valid || authService.isLoading()"
              >
                @if (authService.isLoading()) {
                  <mat-spinner diameter="20" style="margin-right: 8px;"></mat-spinner>
                }
                Continue
              </button>
            </form>

            <mat-divider style="margin: 24px 0;">
              <span style="background-color: white; padding: 0 16px; font-size: 14px;"
                >Other sign up options</span
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
            <p style="margin: 0; margin-top: 16px; font-size: 14px;">
              By signing up, you agree to our
              <a href="#" style="color: #a435f0; text-decoration: none; font-weight: 600;"
                >Terms of Use</a
              >
              and
              <a href="#" style="color: #a435f0; text-decoration: none; font-weight: 600;"
                >Privacy Policy</a
              >.
            </p>
            <p style="margin: 8px 0 0 0; font-size: 14px;">
              Already have an account?
              <a
                routerLink="/login"
                style="color: #a435f0; text-decoration: none; font-weight: 600;"
                >Log in</a
              >
            </p>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./register.scss'],
})
export class Register {
  registerForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  snackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      offers: [false],
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const registerRequest: RegisterRequest = {
          fullName: this.registerForm.value.fullName,
          email: this.registerForm.value.email,
        };

        await this.authService.register(registerRequest);

        this.snackBar.open('Registration successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });

        // Redirect to dashboard
        this.router.navigate(['/']);
      } catch (error) {
        this.snackBar.open('Registration failed. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        console.error('Registration error:', error);
      }
    }
  }
}
