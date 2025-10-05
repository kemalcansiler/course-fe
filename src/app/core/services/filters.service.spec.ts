import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FiltersService } from './filters.service';
import { ApiService } from './api.service';
import { FilterOption } from '../models/course.model';

describe('FiltersService', () => {
  let service: FiltersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FiltersService, ApiService]
    });
    service = TestBed.inject(FiltersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadFilters', () => {
    it('should load filters successfully', (done) => {
      const mockFilters: FilterOption[] = [
        {
          label: 'Category',
          key: 'category',
          options: [
            { label: 'Programming', value: '1', isSelected: false },
            { label: 'Design', value: '2', isSelected: false }
          ]
        },
        {
          label: 'Level',
          key: 'level',
          options: [
            { label: 'Beginner', value: 'beginner', isSelected: false },
            { label: 'Intermediate', value: 'intermediate', isSelected: false }
          ]
        }
      ];

      service.loadFilters().subscribe({
        next: (filters) => {
          expect(filters).toEqual(mockFilters);
          expect(service.filters()).toEqual(mockFilters);
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      expect(service.isLoading()).toBe(true);

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/filters')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockFilters);
    });

    it('should handle error when loading filters', (done) => {
      service.loadFilters().subscribe({
        next: (filters) => {
          expect(filters).toEqual([]);
          expect(service.hasError()).toBe('Failed to load filters');
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/filters')
      );
      req.error(new ProgressEvent('error'));
    });

    it('should return empty array on error as fallback', (done) => {
      service.loadFilters().subscribe({
        next: (filters) => {
          expect(filters).toEqual([]);
          expect(service.filters()).toEqual([]);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('courses/filters')
      );
      req.flush(null, { status: 500, statusText: 'Server Error' });
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      service.clearError();
      expect(service.hasError()).toBeNull();
    });
  });

  it('should have correct initial state', () => {
    expect(service.filters()).toEqual([]);
    expect(service.isLoading()).toBe(false);
    expect(service.hasError()).toBeNull();
  });
});

