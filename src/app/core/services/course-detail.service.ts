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
    title: 'ChatGPT: Complete ChatGPT Course For Work 2025 (Ethically)!',
    headline:
      'ChatGPT Artificial Intelligence (AI) Is Revolutionizing Work. Let ChatGPT 5 AI Help You In So Many Ways. New ChatGPT 5.',
    description:
      'Master ChatGPT and AI to revolutionize your work productivity. Learn the latest ChatGPT 5 features, prompt engineering, and practical applications for business and personal use.',
    imageUrl: 'https://img-c.udemycdn.com/course/480x270/5061666_b32b_6.jpg',
    instructorName: 'Steve Ballinger, MBA',
    averageRating: 4.5,
    ratingCount: 120499,
    totalHours: 12.5,
    lectureCount: 119,
    level: 'All Levels',
    price: 599.99,
    badges: ['Bestseller', 'Role Play'],
    isFree: false,
    lastUpdated: '9/2025',
    language: 'English',
    subtitles: [
      'English [Auto]',
      'Arabic [Auto]',
      'Turkish [Auto]',
      'Spanish [Auto]',
      'French [Auto]',
    ],
    whatYouWillLearn: [
      'Using ChatGPT 5 To Dramatically Increase Your Productivity. Hot Tips That Many Are Not Aware Of.',
      'Using ChatGPT 5 To Improve Your Writing Skills & Shorten Writing Time.',
      'Leveraging ChatGPT 5 For Regular Tasks Like Email, Report Writing, Blogs, Presentation Scripts, And Much More.',
      'Surprising Areas Like Code Debugging, Translation, & Summarizing Long Documents You Need To Read.',
      'Use ChatGPT-5 To Educate Yourself In Soft Skills & Hard Skills. Virtually No Limit.',
      'Demo Of Many Ways You Can Use ChatGPT 5 At Work Plus Some Personal Ways You Can Use It As Well.',
    ],
    courseIncludes: [
      { icon: 'play_circle', text: '12.5 hours on-demand video' },
      { icon: 'article', text: '7 articles' },
      { icon: 'phone_android', text: 'Access on mobile and TV' },
      { icon: 'workspace_premium', text: 'Certificate of completion' },
      { icon: 'psychology', text: 'Role Play' },
    ],
    curriculum: [
      {
        id: '1',
        title: 'ChatGPT AI: Work Faster, Less Stress, With Better Outcomes!',
        lectures: 6,
        duration: '1hr 4min',
        isExpanded: true,
        lessons: [
          {
            id: '1-1',
            title: 'Welcome & Benefits Of ChatGPT',
            duration: '07:21',
            isPreview: true,
            type: 'video',
          },
          {
            id: '1-2',
            title: "(NEW) ChatGPT 5: What Works Brilliantly and What Doesn't Yet (Watch First)",
            duration: '14:10',
            isPreview: false,
            type: 'video',
          },
          { id: '1-3', title: 'Hot Tips!', duration: '13:03', isPreview: true, type: 'video' },
          {
            id: '1-4',
            title: 'AI Is Always Evolving & What Is GenAI',
            duration: '05:47',
            isPreview: true,
            type: 'video',
          },
          {
            id: '1-5',
            title: 'ChatGPT Interface Change Examples',
            duration: '00:42',
            isPreview: false,
            type: 'video',
          },
          {
            id: '1-6',
            title: '(NEW) Mastering the ChatGPT 5 Interface. Key Tools and Navigation in ChatGPT 5',
            duration: '22:29',
            isPreview: true,
            type: 'video',
          },
          {
            id: '1-7',
            title: 'Section 1 Quiz ChatGPT',
            duration: '3 questions',
            isPreview: false,
            type: 'quiz',
          },
        ],
      },
      {
        id: '2',
        title: '(NEW) ChatGPT 5. The Latest AI Model From OpenAI. ChatGPT-5 In Practice. GPT-5',
        lectures: 9,
        duration: '44min',
        isExpanded: false,
        lessons: [],
      },
      {
        id: '3',
        title: '(NEW) Latest ChatGPT Enhancements. ChatGPT and Getting',
        lectures: 27,
        duration: '4hr 1min',
        isExpanded: false,
        lessons: [],
      },
    ],
    instructor: {
      id: '10634862',
      name: 'Steve Ballinger, MBA',
      title: 'MBA',
      imageUrl: 'https://img-c.udemycdn.com/user/200_H/10634862_8a07_2.jpg',
      rating: 4.6,
      totalStudents: 249094,
      totalCourses: 3,
      description:
        'Steve Ballinger is an experienced business professional with an MBA and extensive experience in AI and productivity tools.',
      socialLinks: [
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/steveballinger' },
        { platform: 'Twitter', url: 'https://twitter.com/steveballinger' },
      ],
    },
    requirements: [
      'No prior experience with ChatGPT required',
      'Basic computer skills',
      'Internet connection',
    ],
    targetAudience: [
      'Business professionals looking to increase productivity',
      'Students wanting to learn AI tools',
      'Anyone interested in ChatGPT and AI',
    ],
    relatedTopics: ['ChatGPT', 'Personal Productivity', 'Personal Development'],
    reviews: [
      {
        id: '1',
        studentName: 'John Smith',
        studentImage: 'https://img-c.udemycdn.com/user/50x50/123456.jpg',
        rating: 5,
        date: '2 weeks ago',
        comment:
          'Excellent course! Really helped me understand ChatGPT and how to use it effectively in my work.',
        helpful: 12,
        verified: true,
      },
      {
        id: '2',
        studentName: 'Sarah Johnson',
        studentImage: 'https://img-c.udemycdn.com/user/50x50/789012.jpg',
        rating: 4,
        date: '1 month ago',
        comment: 'Great content and well-structured. The instructor explains everything clearly.',
        helpful: 8,
        verified: true,
      },
    ],
    totalStudents: 249094,
    duration: '12h 43m',
    sections: 9,
  };

  private mockPricing: CoursePricing = {
    originalPrice: 999.99,
    currentPrice: 599.99,
    discountPercentage: 40,
    currency: '₺',
    isOnSale: true,
    subscriptionPrice: 165.0,
    subscriptionTrialDays: 7,
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
