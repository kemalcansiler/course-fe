import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseDetailService } from './course-detail.service';
import { ApiService } from './api.service';

describe('CourseDetailService', () => {
  let service: CourseDetailService;
  let httpMock: HttpTestingController;

  const mockApiResponse = {
    id: 1,
    title: 'Test Course',
    description: 'Test Description',
    shortDescription: 'Short Description',
    imageUrl: 'test.jpg',
    videoUrl: 'test-video.mp4',
    price: 99.99,
    discountPrice: 79.99,
    duration: 120,
    level: 'Beginner',
    language: 'English',
    isFeatured: true,
    rating: 4.5,
    reviewCount: 100,
    enrollmentCount: 500,
    createdAt: '2024-01-01',
    category: {
      id: 1,
      name: 'Programming',
      description: 'Programming courses',
      imageUrl: 'prog.jpg'
    },
    instructor: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      profileImageUrl: 'avatar.jpg',
      dateOfBirth: '1980-01-01',
      bio: 'Expert',
      createdAt: '2020-01-01'
    },
    sections: [
      {
        id: 1,
        title: 'Section 1',
        lessons: [
          {
            id: 1,
            title: 'Lesson 1',
            duration: 30,
            videoUrl: 'lesson1.mp4',
            isFree: true
          },
          {
            id: 2,
            title: 'Lesson 2',
            duration: 40,
            content: 'Article content'
          }
        ]
      },
      {
        id: 2,
        title: 'Section 2',
        lessons: [
          {
            id: 3,
            title: 'Lesson 3',
            duration: 50
          }
        ]
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 5,
        comment: 'Great course!',
        createdAt: '2024-02-01',
        user: {
          firstName: 'Jane',
          lastName: 'Smith',
          profileImageUrl: 'jane.jpg'
        }
      }
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseDetailService, ApiService]
    });
    service = TestBed.inject(CourseDetailService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadCourseDetail', () => {
    it('should load course detail successfully', (done) => {
      service.loadCourseDetail('1').subscribe({
        next: (courseDetail) => {
          expect(courseDetail).toBeDefined();
          expect(courseDetail.id).toBe(1);
          expect(courseDetail.title).toBe('Test Course');
          expect(courseDetail.duration).toBe('2h');
          expect(courseDetail.sections).toBe(2);
          expect(courseDetail.lectures).toBe(3);
          expect(courseDetail.curriculum.length).toBe(2);
          expect(courseDetail.reviews.length).toBe(1);
          expect(service.course()).toEqual(courseDetail);
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      expect(service.isLoading()).toBe(true);

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/1')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });

    it('should handle error when loading course detail', (done) => {
      service.loadCourseDetail('1').subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          expect(service.hasError()).toBe('Failed to load course details');
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/1')
      );
      req.error(new ProgressEvent('error'));
    });

    it('should format duration correctly', (done) => {
      const responseWithDifferentDuration = { ...mockApiResponse, duration: 65 };

      service.loadCourseDetail('2').subscribe({
        next: (courseDetail) => {
          expect(courseDetail.duration).toBe('1h 5m');
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/2')
      );
      req.flush(responseWithDifferentDuration);
    });

    it('should handle course with no sections', (done) => {
      const responseWithoutSections = { ...mockApiResponse, sections: null };

      service.loadCourseDetail('3').subscribe({
        next: (courseDetail) => {
          expect(courseDetail.curriculum).toEqual([]);
          expect(courseDetail.sections).toBe(0);
          expect(courseDetail.lectures).toBe(0);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/3')
      );
      req.flush(responseWithoutSections);
    });

    it('should handle course with no reviews', (done) => {
      const responseWithoutReviews = { ...mockApiResponse, reviews: null };

      service.loadCourseDetail('4').subscribe({
        next: (courseDetail) => {
          expect(courseDetail.reviews).toEqual([]);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/4')
      );
      req.flush(responseWithoutReviews);
    });

    it('should handle anonymous reviewer', (done) => {
      const responseWithAnonymousReview = {
        ...mockApiResponse,
        reviews: [{
          id: 1,
          rating: 4,
          comment: 'Good',
          createdAt: '2024-02-01',
          user: null
        }]
      };

      service.loadCourseDetail('5').subscribe({
        next: (courseDetail) => {
          expect(courseDetail.reviews[0].studentName).toBe('Anonymous');
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/5')
      );
      req.flush(responseWithAnonymousReview);
    });
  });

  describe('toggleSection', () => {
    it('should toggle section expansion', (done) => {
      service.loadCourseDetail('1').subscribe({
        next: () => {
          const course = service.course();
          expect(course?.curriculum[0].isExpanded).toBe(false);

          service.toggleSection('1');

          const updatedCourse = service.course();
          expect(updatedCourse?.curriculum[0].isExpanded).toBe(true);

          service.toggleSection('1');

          const finalCourse = service.course();
          expect(finalCourse?.curriculum[0].isExpanded).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/1')
      );
      req.flush(mockApiResponse);
    });

    it('should not throw error when no course is loaded', () => {
      expect(() => service.toggleSection('1')).not.toThrow();
    });
  });

  describe('expandAllSections', () => {
    it('should expand all sections', (done) => {
      service.loadCourseDetail('1').subscribe({
        next: () => {
          service.expandAllSections();

          const course = service.course();
          expect(course?.curriculum.every(s => s.isExpanded)).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/1')
      );
      req.flush(mockApiResponse);
    });

    it('should not throw error when no course is loaded', () => {
      expect(() => service.expandAllSections()).not.toThrow();
    });
  });

  describe('collapseAllSections', () => {
    it('should collapse all sections', (done) => {
      service.loadCourseDetail('1').subscribe({
        next: () => {
          service.expandAllSections();
          service.collapseAllSections();

          const course = service.course();
          expect(course?.curriculum.every(s => !s.isExpanded)).toBe(true);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/1')
      );
      req.flush(mockApiResponse);
    });

    it('should not throw error when no course is loaded', () => {
      expect(() => service.collapseAllSections()).not.toThrow();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      service.clearError();
      expect(service.hasError()).toBeNull();
    });
  });

  it('should have correct initial state', () => {
    expect(service.course()).toBeNull();
    expect(service.isLoading()).toBe(false);
    expect(service.hasError()).toBeNull();
  });
});

