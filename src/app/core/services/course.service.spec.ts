import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { ApiService } from './api.service';
import { FiltersService } from './filters.service';
import { ApiCourseResponse } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  let filtersService: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService, ApiService, FiltersService]
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
    filtersService = TestBed.inject(FiltersService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadCourses', () => {
    it('should load courses successfully', (done) => {
      const mockResponse: ApiCourseResponse = {
        data: [
          {
            id: 1,
            title: 'Test Course',
            description: 'Test Description',
            shortDescription: 'Short Desc',
            imageUrl: '',
            videoUrl: '',
            price: 99.99,
            discountPrice: null,
            duration: 120,
            level: 'Beginner',
            language: 'English',
            isFeatured: false,
            rating: 4.5,
            reviewCount: 10,
            enrollmentCount: 100,
            createdAt: '2024-01-01',
            category: { id: 1, name: 'Programming', description: '', imageUrl: '' },
            instructor: { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', profileImageUrl: '', dateOfBirth: '', bio: '', createdAt: new Date().toISOString() }
          }
        ],
        page: 0,
        pageSize: 12,
        totalCount: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false
      };

      service.loadCourses(0, 12, 'most-popular', {}).subscribe({
        next: (response) => {
          expect(response.data.length).toBe(1);
          expect(response.data[0].title).toBe('Test Course');
          expect(response.totalCount).toBe(1);
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle error when loading courses', (done) => {
      service.loadCourses(0, 12, 'most-popular', {}).subscribe({
        next: (response) => {
          expect(response.data).toEqual([]);
          expect(response.totalCount).toBe(0);
          expect(service.hasError()).toBe('Failed to load courses');
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses')
      );
      req.error(new ProgressEvent('error'));
    });

    it('should include filter parameters in request', (done) => {
      const mockResponse: ApiCourseResponse = {
        data: [],
        page: 0,
        pageSize: 12,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };

      const filters = {
        category: ['1', '2'],
        ratings: ['4.5']
      };

      service.loadCourses(0, 12, 'highest-rated', filters).subscribe({
        next: () => {
          done();
        }
      });

      const req = httpMock.expectOne((request) => {
        const url = request.url;
        return url.includes('courses') && 
               url.includes('sortBy=highest-rated') &&
               url.includes('category=1') &&
               url.includes('category=2') &&
               url.includes('ratings=4.5');
      });
      req.flush(mockResponse);
    });
  });

  describe('updateFilters', () => {
    it('should update filters and reset page', (done) => {
      const mockResponse: ApiCourseResponse = {
        data: [],
        page: 0,
        pageSize: 12,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };

      const filters = { category: ['1'] };

      service.updateFilters(filters).subscribe({
        next: (response) => {
          expect(response.page).toBe(0);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses')
      );
      req.flush(mockResponse);
    });
  });

  describe('updateSorting', () => {
    it('should update sorting and reset page', (done) => {
      const mockResponse: ApiCourseResponse = {
        data: [],
        page: 0,
        pageSize: 12,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };

      service.updateSorting('newest').subscribe({
        next: (response) => {
          expect(response.page).toBe(0);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('sortBy=newest')
      );
      req.flush(mockResponse);
    });
  });

  describe('updatePagination', () => {
    it('should update pagination', (done) => {
      const mockResponse: ApiCourseResponse = {
        data: [],
        page: 1,
        pageSize: 24,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };

      service.updatePagination(1, 24).subscribe({
        next: (response) => {
          expect(response.page).toBe(1);
          expect(response.pageSize).toBe(24);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('page=1') && request.url.includes('pageSize=24')
      );
      req.flush(mockResponse);
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      service.clearError();
      expect(service.hasError()).toBeNull();
    });
  });
});

