import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ProfileDto, UpdateProfileRequest } from '../models/profile.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiService = inject(ApiService);

  private _profile = signal<ProfileDto | null>(null);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Public computed signals
  profile = computed(() => this._profile());
  isLoading = computed(() => this._isLoading());
  error = computed(() => this._error());

  /**
   * Get user profile from API
   */
  getProfile(): Observable<ProfileDto> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.apiService.get<ProfileDto>('Profile').pipe(
      tap((profile) => {
        this._profile.set(profile);
        this._isLoading.set(false);
      }),
      catchError((error) => {
        this._isLoading.set(false);
        this._error.set(error.message);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Update user profile
   */
  updateProfile(request: UpdateProfileRequest): Observable<ProfileDto> {
    this._isLoading.set(true);
    this._error.set(null);

    return this.apiService.put<ProfileDto>('Profile', request).pipe(
      tap((profile) => {
        this._profile.set(profile);
        this._isLoading.set(false);
      }),
      catchError((error) => {
        this._isLoading.set(false);
        this._error.set(error.message);
        return throwError(() => error);
      }),
    );
  }

  /**
   * Clear profile data
   */
  clearProfile(): void {
    this._profile.set(null);
    this._error.set(null);
  }

  /**
   * Clear error state
   */
  clearError(): void {
    this._error.set(null);
  }
}
