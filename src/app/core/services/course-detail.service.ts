import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { CourseDetail } from '../models/course-detail.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CourseDetailService {
  private apiService = inject(ApiService);
  
  private courseDetail = signal<CourseDetail | null>(null);
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public signals
  course = computed(() => this.courseDetail());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());

  // Map API response to CourseDetail format
  private mapApiResponseToCourseDetail(apiResponse: any): CourseDetail {
    return {
      id: apiResponse.id,
      title: apiResponse.title,
      description: apiResponse.description,
      shortDescription: apiResponse.shortDescription,
      imageUrl: apiResponse.imageUrl,
      videoUrl: apiResponse.videoUrl,
      price: apiResponse.price,
      discountPrice: apiResponse.discountPrice,
      duration: this.formatDuration(apiResponse.duration),
      level: apiResponse.level,
      language: apiResponse.language,
      isFeatured: apiResponse.isFeatured,
      rating: apiResponse.rating,
      reviewCount: apiResponse.reviewCount,
      enrollmentCount: apiResponse.enrollmentCount,
      createdAt: apiResponse.createdAt,
      category: apiResponse.category,
      instructor: apiResponse.instructor,
      courseIncludes: this.generateCourseIncludes(apiResponse),
      curriculum: apiResponse.sections?.map((section: any) => ({
        id: section.id.toString(),
        title: section.title,
        lectures: section.lessons?.length || 0,
        duration: this.calculateSectionDuration(section.lessons || []),
        isExpanded: false,
        lessons: section.lessons?.map((lesson: any) => ({
          id: lesson.id.toString(),
          title: lesson.title,
          duration: this.formatDuration(lesson.duration),
          isPreview: lesson.isFree || false,
          type: this.getLessonType(lesson),
        })) || [],
      })) || [],
      targetAudience: [],
      relatedTopics: this.generateRelatedTopics(apiResponse),
      reviews: apiResponse.reviews?.map((review: any) => ({
        id: review.id.toString(),
        studentName: `${review.user?.firstName || ''} ${review.user?.lastName || ''}`.trim() || 'Anonymous',
        studentImage: review.user?.profileImageUrl || '/default-avatar.svg',
        rating: review.rating,
        date: review.createdAt,
        comment: review.comment,
        helpful: 0,
        verified: true,
      })) || [],
      sections: apiResponse.sections?.length || 0,
      lectures: this.calculateTotalLectures(apiResponse.sections || []),
    };
  }

  // Helper: Format duration from minutes to readable string
  private formatDuration(minutes: number): string {
    if (!minutes || isNaN(minutes)) return '0m';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes}m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  }

  // Helper: Calculate section duration
  private calculateSectionDuration(lessons: any[]): string {
    const totalMinutes = lessons.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
    return this.formatDuration(totalMinutes);
  }

  // Helper: Calculate total lectures
  private calculateTotalLectures(sections: any[]): number {
    return sections.reduce((sum, section) => sum + (section.lessons?.length || 0), 0);
  }

  // Helper: Get lesson type
  private getLessonType(lesson: any): 'video' | 'quiz' | 'article' {
    if (lesson.videoUrl) return 'video';
    if (lesson.content) return 'article';
    return 'video'; // default
  }

  // Helper: Generate course includes
  private generateCourseIncludes(course: any): Array<{ icon: string; text: string }> {
    const includes: Array<{ icon: string; text: string }> = [];
    
    if (course.duration) {
      const hours = Math.floor(course.duration / 60);
      includes.push({
        icon: 'play_circle',
        text: `${hours}+ hours on-demand video`,
      });
    }
    
    includes.push(
      { icon: 'article', text: 'Downloadable resources' },
      { icon: 'all_inclusive', text: 'Full lifetime access' },
      { icon: 'phone_android', text: 'Access on mobile and TV' },
      { icon: 'workspace_premium', text: 'Certificate of completion' }
    );
    
    return includes;
  }

  // Helper: Generate related topics
  private generateRelatedTopics(course: any): string[] {
    const topics: string[] = [];
    
    if (course.category?.name) {
      topics.push(course.category.name);
    }
    
    if (course.level) {
      topics.push(course.level);
    }
    
    // Add some generic topics based on title/description keywords
    const keywords = ['Development', 'Programming', 'Web', 'Mobile', 'Backend', 'Frontend'];
    const text = `${course.title} ${course.description}`.toLowerCase();
    
    keywords.forEach(keyword => {
      if (text.includes(keyword.toLowerCase()) && !topics.includes(keyword)) {
        topics.push(keyword);
      }
    });
    
    return topics.slice(0, 8); // Limit to 8 topics
  }

  // Load course detail by ID
  loadCourseDetail(courseId: string): Observable<CourseDetail> {
    this.loading.set(true);
    this.error.set(null);

    return this.apiService.get<any>(`courses/${courseId}`).pipe(
      map((apiResponse) => this.mapApiResponseToCourseDetail(apiResponse)),
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
