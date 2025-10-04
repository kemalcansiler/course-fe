import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseDetail, CoursePricing } from '../models/course-detail.model';

@Injectable({ providedIn: 'root' })
export class CourseDetailService {
  private courseDetail = signal<CourseDetail | null>(null);
  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public signals
  course = computed(() => this.courseDetail());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());

  // Generate random delay between 200-800ms
  private getRandomDelay(): number {
    return Math.floor(Math.random() * 600) + 200;
  }

  // Mock course detail data
  private mockCourseDetail: CourseDetail = {
    id: '5061666',
    title: 'Complete Web Development Course',
    headline: 'Learn modern web development with HTML, CSS, JavaScript, and React from scratch.',
    description:
      'A comprehensive course covering all aspects of modern web development. Perfect for beginners who want to become professional developers.',
    imageUrl: 'https://img-c.udemycdn.com/course/480x270/5061666_b32b_6.jpg',
    instructorName: 'John Smith',
    averageRating: 4.3,
    ratingCount: 1250,
    totalHours: 8.5,
    lectureCount: 45,
    level: 'Beginner',
    price: 99.99,
    badges: ['Popular'],
    isFree: false,
    lastUpdated: '12/2024',
    language: 'English',
    subtitles: ['English'],
    whatYouWillLearn: [
      'Build responsive websites with HTML and CSS',
      'Create interactive web applications with JavaScript',
      'Develop modern React applications',
      'Understand web development best practices',
      'Deploy websites to production',
    ],
    courseIncludes: [
      { icon: 'play_circle', text: '8.5 hours on-demand video' },
      { icon: 'article', text: '5 articles' },
      { icon: 'phone_android', text: 'Access on mobile and TV' },
      { icon: 'workspace_premium', text: 'Certificate of completion' },
    ],
    curriculum: [
      {
        id: '1',
        title: 'Introduction to Web Development',
        lectures: 8,
        duration: '1hr 30min',
        isExpanded: true,
        lessons: [
          {
            id: '1-1',
            title: 'Course Introduction',
            duration: '05:00',
            isPreview: true,
            type: 'video',
          },
          {
            id: '1-2',
            title: 'What is Web Development?',
            duration: '10:00',
            isPreview: false,
            type: 'video',
          },
          {
            id: '1-3',
            title: 'Setting up Development Environment',
            duration: '15:00',
            isPreview: false,
            type: 'video',
          },
          {
            id: '1-4',
            title: 'Introduction to HTML',
            duration: '20:00',
            isPreview: true,
            type: 'video',
          },
          {
            id: '1-5',
            title: 'HTML Basics Practice',
            duration: '25:00',
            isPreview: false,
            type: 'video',
          },
          {
            id: '1-6',
            title: 'Introduction to CSS',
            duration: '15:00',
            isPreview: true,
            type: 'video',
          },
        ],
      },
      {
        id: '2',
        title: 'HTML and CSS Fundamentals',
        lectures: 12,
        duration: '2hr 15min',
        isExpanded: false,
        lessons: [],
      },
      {
        id: '3',
        title: 'JavaScript Basics',
        lectures: 15,
        duration: '2hr 30min',
        isExpanded: false,
        lessons: [],
      },
      {
        id: '4',
        title: 'React Development',
        lectures: 10,
        duration: '2hr 15min',
        isExpanded: false,
        lessons: [],
      },
    ],
    instructor: {
      id: '12345',
      name: 'John Smith',
      title: 'Senior Web Developer',
      imageUrl: 'https://img-c.udemycdn.com/user/200_H/10634862_8a07_2.jpg',
      rating: 4.5,
      totalStudents: 2500,
      totalCourses: 5,
      description:
        'John is a senior web developer with 8+ years of experience in building modern web applications.',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/johnsmith' },
        { platform: 'GitHub', url: 'https://github.com/johnsmith' },
      ],
    },
    requirements: [
      'Basic computer skills',
      'No programming experience required',
      'Internet connection',
    ],
    targetAudience: [
      'Beginners who want to learn web development',
      'Students interested in programming',
      'Anyone looking to start a career in tech',
    ],
    relatedTopics: ['Web Development', 'Programming', 'JavaScript'],
    reviews: [
      {
        id: '1',
        studentName: 'Alice Johnson',
        studentImage: 'https://img-c.udemycdn.com/user/50x50/123456.jpg',
        rating: 5,
        date: '1 week ago',
        comment:
          'Great course! Perfect for beginners. The instructor explains everything clearly and step by step.',
        helpful: 8,
        verified: true,
      },
      {
        id: '2',
        studentName: 'Mike Wilson',
        studentImage: 'https://img-c.udemycdn.com/user/50x50/789012.jpg',
        rating: 4,
        date: '2 weeks ago',
        comment: 'Very well structured course. I learned a lot about web development fundamentals.',
        helpful: 5,
        verified: true,
      },
    ],
    totalStudents: 2500,
    duration: '8h 30m',
    sections: 4,
  };

  private mockPricing: CoursePricing = {
    originalPrice: 99.99,
    currentPrice: 99.99,
    discountPercentage: 0,
    currency: '₺',
    isOnSale: false,
    subscriptionPrice: 0,
    subscriptionTrialDays: 0,
  };

  constructor() {}

  // Load course detail by ID
  loadCourseDetail(courseId: string): Observable<CourseDetail> {
    this.loading.set(true);
    this.error.set(null);

    return of(this.mockCourseDetail).pipe(
      delay(this.getRandomDelay()),
      tap((courseDetail) => {
        this.courseDetail.set(courseDetail);
        this.loading.set(false);
      }),
      // In real implementation, you would make an HTTP request here
      // .pipe(
      //   catchError(error => {
      //     this.error.set('Failed to load course details');
      //     this.loading.set(false);
      //     return throwError(error);
      //   })
      // )
    );
  }

  // Get course pricing
  getCoursePricing(courseId: string): Observable<CoursePricing> {
    return of(this.mockPricing).pipe(delay(100));
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
