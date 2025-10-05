import { Injectable, signal, computed } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CourseDetail, CoursePricing } from '../models/course-detail.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CourseDetailService {
  private courseDetail = signal<CourseDetail | null>(null);
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public signals
  course = computed(() => this.courseDetail());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());

  constructor(private apiService: ApiService) {}

  // Load course detail by ID
  loadCourseDetail(courseId: string): Observable<CourseDetail> {
    this.loading.set(true);
    this.error.set(null);

    return this.apiService.get<CourseDetail>(`courses/${courseId}`).pipe(
      tap((courseDetail) => {
        this.courseDetail.set(courseDetail);
        this.loading.set(false);
      }),
      catchError((error) => {
        this.error.set('Failed to load course details');
        this.loading.set(false);
        console.error('Failed to load course details:', error);
        return throwError(() => error);
      }),
    );
  }

  // Get course pricing
  getCoursePricing(courseId: string): Observable<CoursePricing> {
    return this.apiService.get<CoursePricing>(`courses/${courseId}/pricing`).pipe(
      catchError((error) => {
        console.error('Failed to load course pricing:', error);
        return throwError(() => error);
      }),
    );
  }

  // Toggle section expansion
  toggleSection(sectionId: string): void {
    const currentCourse = this.courseDetail();
    if (currentCourse) {
      const updatedCurriculum = currentCourse.curriculum.map((section) =>
        section.id === sectionId ? { ...section, isExpanded: !section.isExpanded } : section,
      );

      this.courseDetail.set({
        ...currentCourse,
        curriculum: updatedCurriculum,
      });
    }
  }

  // Expand all sections
  expandAllSections(): void {
    const currentCourse = this.courseDetail();
    if (currentCourse) {
      const updatedCurriculum = currentCourse.curriculum.map((section) => ({
        ...section,
        isExpanded: true,
      }));

      this.courseDetail.set({
        ...currentCourse,
        curriculum: updatedCurriculum,
      });
    }
  }

  // Collapse all sections
  collapseAllSections(): void {
    const currentCourse = this.courseDetail();
    if (currentCourse) {
      const updatedCurriculum = currentCourse.curriculum.map((section) => ({
        ...section,
        isExpanded: false,
      }));

      this.courseDetail.set({
        ...currentCourse,
        curriculum: updatedCurriculum,
      });
    }
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }
}
