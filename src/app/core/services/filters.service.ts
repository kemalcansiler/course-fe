import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { FilterOption } from '../models/course.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class FiltersService {
  private apiService = inject(ApiService);

  private filtersData = signal<FilterOption[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public signals
  filters = computed(() => this.filtersData());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());

  // Load filters from API
  loadFilters(): Observable<FilterOption[]> {
    this.loading.set(true);
    this.error.set(null);

    return this.apiService.get<FilterOption[]>('courses/filters').pipe(
      map((filters) => {
        this.filtersData.set(filters);
        this.loading.set(false);
        return filters;
      }),
      catchError((error) => {
        console.error('Error loading filters:', error);
        this.error.set('Failed to load filters');
        this.loading.set(false);
        // Return empty array as fallback
        return of([]);
      }),
    );
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }
}
