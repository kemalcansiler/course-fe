import { Component, inject, signal, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ProfileService } from '../../core/services/profile.service';
import { ProfileDto } from '../../core/models/profile.model';

@Component({
  selector: 'app-profile',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="profile-container">
      <!-- Background Gradient -->
      <div class="background-gradient"></div>

      @if (profileService.isLoading()) {
        <div class="loading-container">
          <mat-spinner diameter="50"></mat-spinner>
          <p>Loading profile...</p>
        </div>
      } @else if (profile()) {
        <div class="profile-content">
          <!-- Profile Header - Compact Design -->
          <mat-card class="profile-header-card">
            <div class="profile-header">
              <div class="avatar-section">
                <img
                  [src]="profile()!.profileImageUrl || 'default-avatar.svg'"
                  [alt]="profile()!.firstName + ' ' + profile()!.lastName"
                  class="profile-avatar"
                  width="80"
                  height="80"
                />
              </div>
              <div class="profile-info">
                <h1 class="profile-name">{{ profile()!.firstName }} {{ profile()!.lastName }}</h1>
                <p class="profile-email">{{ profile()!.email }}</p>
              </div>
            </div>
          </mat-card>

          <!-- Profile Form -->
          <mat-card class="profile-form-card">
            <mat-card-header>
              <mat-card-title>Profile Information</mat-card-title>
              <mat-card-subtitle>Update your personal information</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <form [formGroup]="profileForm" (ngSubmit)="onSubmit()">
                <div class="form-row-group" style="margin-top: 24px;">
                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>First Name</mat-label>
                    <input
                      matInput
                      type="text"
                      formControlName="firstName"
                      placeholder="Enter your first name"
                    />
                    <mat-icon matSuffix>person</mat-icon>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="half-width">
                    <mat-label>Last Name</mat-label>
                    <input
                      matInput
                      type="text"
                      formControlName="lastName"
                      placeholder="Enter your last name"
                    />
                    <mat-icon matSuffix>person</mat-icon>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Bio</mat-label>
                    <textarea
                      matInput
                      formControlName="bio"
                      placeholder="Tell us about yourself"
                      rows="3"
                    ></textarea>
                    <mat-icon matSuffix>description</mat-icon>
                  </mat-form-field>
                </div>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="full-width">
                    <mat-label>Date of Birth</mat-label>
                    <input
                      matInput
                      type="date"
                      formControlName="dateOfBirth"
                      placeholder="Enter your date of birth"
                    />
                    <mat-icon matSuffix>cake</mat-icon>
                  </mat-form-field>
                </div>

                <div class="form-actions">
                  <button
                    mat-raised-button
                    color="primary"
                    type="submit"
                    [disabled]="!profileForm.valid || isUpdating()"
                  >
                    @if (isUpdating()) {
                      <mat-spinner diameter="20" style="margin-right: 8px;"></mat-spinner>
                    }
                    Update Profile
                  </button>

                  <button mat-button type="button" (click)="resetForm()" [disabled]="isUpdating()">
                    Reset
                  </button>
                </div>
              </form>
            </mat-card-content>
          </mat-card>

          <!-- Learning Progress -->
          <mat-card class="stats-card">
            <mat-card-header>
              <mat-card-title>Learning Progress</mat-card-title>
              <mat-card-subtitle>Your learning journey</mat-card-subtitle>
            </mat-card-header>

            <mat-card-content>
              <div class="stats-grid" style="margin-top: 16px;">
                <div class="stat-item">
                  <div class="stat-icon-wrapper">
                    <mat-icon class="stat-icon">school</mat-icon>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Courses Enrolled</div>
                  </div>
                </div>

                <div class="stat-item">
                  <div class="stat-icon-wrapper">
                    <mat-icon class="stat-icon">schedule</mat-icon>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">0h</div>
                    <div class="stat-label">Learning Time</div>
                  </div>
                </div>

                <div class="stat-item">
                  <div class="stat-icon-wrapper">
                    <mat-icon class="stat-icon">workspace_premium</mat-icon>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Certificates</div>
                  </div>
                </div>

                <div class="stat-item">
                  <div class="stat-icon-wrapper">
                    <mat-icon class="stat-icon">star</mat-icon>
                  </div>
                  <div class="stat-content">
                    <div class="stat-value">0</div>
                    <div class="stat-label">Achievements</div>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      } @else {
        <div class="error-container">
          <mat-icon>error</mat-icon>
          <h2>Profile not found</h2>
          <p>Unable to load your profile information.</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .profile-container {
        min-height: 100vh;
        background-color: #f7f9fa;
        position: relative;
      }

      .background-gradient {
        height: 200px;
        background: linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #1976d2 100%);
        margin-bottom: -200px;
        position: relative;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            135deg,
            rgba(25, 118, 210, 0.8) 0%,
            rgba(66, 165, 245, 0.6) 50%,
            rgba(25, 118, 210, 0.8) 100%
          );
        }
      }

      .profile-content {
        position: relative;
        z-index: 1;
        max-width: 1200px;
        margin: 0 auto;
        padding: 16px;
        padding-top: 220px;
      }

      .loading-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        gap: 16px;
      }

      .profile-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .profile-header-card {
        margin-bottom: 16px;
      }

      .profile-header {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
      }

      .avatar-section {
        position: relative;
      }

      .profile-avatar {
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid #e0e0e0;
      }

      .edit-avatar-btn {
        position: absolute;
        bottom: -2px;
        right: -2px;
        background-color: #1976d2;
        color: white;
        width: 28px;
        height: 28px;
        font-size: 16px;
      }

      .edit-avatar-btn:hover {
        background-color: #1565c0;
      }

      .profile-info {
        flex: 1;
      }

      .profile-name {
        margin: 0 0 4px 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: #333;
      }

      .profile-email {
        margin: 0;
        color: #666;
        font-size: 1rem;
      }

      .member-since {
        background-color: #e3f2fd;
        color: #1976d2;
        font-size: 0.8rem;
      }

      .profile-form-card,
      .stats-card {
        margin-bottom: 16px;
      }

      .form-row {
        margin-bottom: 12px;
      }

      .form-row-group {
        display: flex;
        gap: 12px;
        margin-bottom: 12px;
      }

      .full-width {
        width: 100%;
      }

      .half-width {
        flex: 1;
      }

      .form-actions {
        display: flex;
        gap: 12px;
        margin-top: 16px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 8px 0;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background-color: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
      }

      .stat-icon-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background-color: #e3f2fd;
        border-radius: 50%;
      }

      .stat-icon {
        font-size: 1.2rem;
        color: #1976d2;
      }

      .stat-content {
        flex: 1;
      }

      .stat-value {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        margin-bottom: 2px;
      }

      .stat-label {
        font-size: 0.8rem;
        color: #666;
      }

      .error-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 300px;
        text-align: center;
      }

      .error-container mat-icon {
        font-size: 3rem;
        color: #f44336;
        margin-bottom: 16px;
      }

      .error-container h2 {
        margin: 0 0 8px 0;
        color: #333;
      }

      .error-container p {
        margin: 0;
        color: #666;
      }

      @media (max-width: 768px) {
        .profile-container {
          padding: 12px;
        }

        .profile-header {
          flex-direction: column;
          text-align: center;
          gap: 12px;
          padding: 16px;
        }

        .form-row-group {
          flex-direction: column;
          gap: 12px;
        }

        .stats-grid {
          grid-template-columns: 1fr;
          gap: 8px;
        }

        .form-actions {
          flex-direction: column;
          gap: 8px;
        }
      }

      @media (max-width: 480px) {
        .profile-container {
          padding: 8px;
        }

        .profile-header {
          padding: 12px;
        }

        .stat-item {
          padding: 8px;
        }
      }
    `,
  ],
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);

  profile = signal<ProfileDto | null>(null);
  isUpdating = signal<boolean>(false);
  profileForm: FormGroup;

  authService = inject(AuthService);
  profileService = inject(ProfileService);
  snackBar = inject(MatSnackBar);

  constructor() {
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      bio: [''],
      dateOfBirth: [''],
    });
  }

  ngOnInit() {
    this.loadProfile();
  }

  private loadProfile() {
    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.profile.set(profile);
        this.profileForm.patchValue({
          firstName: profile.firstName,
          lastName: profile.lastName,
          bio: profile.bio || '',
          dateOfBirth: profile.dateOfBirth ? this.formatDateForInput(profile.dateOfBirth) : '',
        });
      },
      error: (error) => {
        this.snackBar.open('Failed to load profile. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }

  private formatDateForInput(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.profileForm.valid && this.profile()) {
      this.isUpdating.set(true);

      const formValue = this.profileForm.value;
      const updateRequest = {
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        bio: formValue.bio || null,
        dateOfBirth: formValue.dateOfBirth ? new Date(formValue.dateOfBirth).toISOString() : null,
      };

      this.profileService.updateProfile(updateRequest).subscribe({
        next: (updatedProfile) => {
          this.profile.set(updatedProfile);
          this.isUpdating.set(false);

          // Update auth service current user to reflect changes in header
          const currentUser = this.authService.currentUser();
          if (currentUser) {
            const updatedUser = {
              ...currentUser,
              firstName: updatedProfile.firstName,
              lastName: updatedProfile.lastName,
              bio: updatedProfile.bio,
              dateOfBirth: updatedProfile.dateOfBirth,
              profileImageUrl: updatedProfile.profileImageUrl,
            };
            this.authService.updateCurrentUser(updatedUser);
          }

          this.snackBar.open('Profile updated successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
        error: (error) => {
          this.isUpdating.set(false);
          this.snackBar.open('Failed to update profile. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  resetForm() {
    const currentProfile = this.profile();
    if (currentProfile) {
      this.profileForm.patchValue({
        firstName: currentProfile.firstName,
        lastName: currentProfile.lastName,
        bio: currentProfile.bio || '',
        dateOfBirth: currentProfile.dateOfBirth
          ? this.formatDateForInput(currentProfile.dateOfBirth)
          : '',
      });
    }
  }

  onEditAvatar() {
    // Placeholder for avatar editing functionality
    this.snackBar.open('Avatar editing feature coming soon!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
