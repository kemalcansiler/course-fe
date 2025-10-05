import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, of, map, catchError } from 'rxjs';
import { Course, CourseSearchResponse, ApiCourseResponse } from '../models/course.model';
import { ApiService } from './api.service';
import { FiltersService } from './filters.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiService = inject(ApiService);
  private filtersService = inject(FiltersService);

  private coursesData = signal<CourseSearchResponse>({
    data: [],
    page: 0,
    pageSize: 12,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    filters: [],
  });

  private loading = signal(false);
  private error = signal<string | null>(null);
  
  // Store current filters and sort
  private currentFilters = signal<{ [key: string]: string[] }>({});
  private currentSortBy = signal<string>('most-popular');

  // Public signals
  courses = computed(() => this.coursesData());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());

  // Map API response to expected format
  private mapApiResponseToCourseSearchResponse(
    apiResponse: ApiCourseResponse,
  ): CourseSearchResponse {
    return {
      data: apiResponse.data.map((course) => this.mapApiCourseToCourse(course)),
      page: apiResponse.page,
      pageSize: apiResponse.pageSize,
      totalCount: apiResponse.totalCount,
      totalPages: apiResponse.totalPages,
      hasNextPage: apiResponse.hasNextPage,
      hasPreviousPage: apiResponse.hasPreviousPage,
      filters: this.filtersService.filters(),
    };
  }

  // Map API course to frontend course format
  private mapApiCourseToCourse(apiCourse: any): Course {
    return {
      id: apiCourse.id,
      title: apiCourse.title,
      description: apiCourse.description,
      shortDescription: apiCourse.shortDescription,
      imageUrl: apiCourse.imageUrl,
      videoUrl: apiCourse.videoUrl,
      price: apiCourse.price,
      discountPrice: apiCourse.discountPrice,
      duration: apiCourse.duration,
      level: apiCourse.level,
      language: apiCourse.language,
      isFeatured: apiCourse.isFeatured,
      rating: apiCourse.rating,
      reviewCount: apiCourse.reviewCount,
      enrollmentCount: apiCourse.enrollmentCount,
      createdAt: apiCourse.createdAt,
      category: apiCourse.category,
      instructor: apiCourse.instructor,
    };
  }

  // Load courses with filters and pagination
  loadCourses(
    page: number = 0,
    pageSize: number = 12,
    sortBy: string = 'most-popular',
    filters: { [key: string]: string[] } = {},
  ): Observable<CourseSearchResponse> {
    this.loading.set(true);
    this.error.set(null);
    
    // Store current state
    this.currentFilters.set(filters);
    this.currentSortBy.set(sortBy);

    // Build query parameters
    let params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    params.set('sortBy', sortBy);

    // Add filter parameters
    Object.keys(filters).forEach((key) => {
      if (filters[key] && filters[key].length > 0) {
        filters[key].forEach((value) => {
          params.append(key, value);
        });
      }
    });

    return this.apiService.get<ApiCourseResponse>(`courses?${params.toString()}`).pipe(
      map((apiResponse) => {
        const response = this.mapApiResponseToCourseSearchResponse(apiResponse);
        this.coursesData.set(response);
        this.loading.set(false);
        return response;
      }),
      catchError((error) => {
        console.error('Error loading courses:', error);
        this.error.set('Failed to load courses');
        this.loading.set(false);
        // Return empty response as fallback
        const emptyResponse: CourseSearchResponse = {
          data: [],
          page: page,
          pageSize: pageSize,
          totalCount: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          filters: this.filtersService.filters(),
        };
        this.coursesData.set(emptyResponse);
        return of(emptyResponse);
      }),
    );
  }

  // Update filters
  updateFilters(filters: { [key: string]: string[] }): Observable<CourseSearchResponse> {
    const currentData = this.coursesData();
    return this.loadCourses(
      0, // Reset to first page when filters change
      currentData.pageSize,
      this.currentSortBy(), // Keep current sort
      filters,
    );
  }

  // Update sorting
  updateSorting(sortBy: string): Observable<CourseSearchResponse> {
    const currentData = this.coursesData();
    return this.loadCourses(
      0, // Reset to first page when sort changes
      currentData.pageSize,
      sortBy,
      this.currentFilters(), // Keep current filters
    );
  }

  // Update pagination
  updatePagination(page: number, pageSize: number): Observable<CourseSearchResponse> {
    return this.loadCourses(
      page,
      pageSize,
      this.currentSortBy(), // Keep current sort
      this.currentFilters(), // Keep current filters
    );
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }
}
