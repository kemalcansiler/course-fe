import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    sessionStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    sessionStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('GET requests', () => {
    it('should make GET request', (done) => {
      const mockData = { id: 1, name: 'Test' };

      service.get<typeof mockData>('test').subscribe({
        next: (data) => {
          expect(data).toEqual(mockData);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockData);
    });

    it('should include authorization header when token exists', (done) => {
      sessionStorage.setItem('auth_token', 'test-token');
      const mockData = { id: 1 };

      service.get<typeof mockData>('test').subscribe({
        next: () => {
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
      req.flush(mockData);
    });
  });

  describe('POST requests', () => {
    it('should make POST request', (done) => {
      const postData = { name: 'Test' };
      const mockResponse = { id: 1, name: 'Test' };

      service.post<typeof mockResponse>('test', postData).subscribe({
        next: (data) => {
          expect(data).toEqual(mockResponse);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(postData);
      req.flush(mockResponse);
    });
  });

  describe('PUT requests', () => {
    it('should make PUT request', (done) => {
      const putData = { id: 1, name: 'Updated' };

      service.put<typeof putData>('test', putData).subscribe({
        next: (data) => {
          expect(data).toEqual(putData);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      expect(req.request.method).toBe('PUT');
      req.flush(putData);
    });
  });

  describe('DELETE requests', () => {
    it('should make DELETE request', (done) => {
      const mockResponse = { success: true };

      service.delete<typeof mockResponse>('test/1').subscribe({
        next: (data) => {
          expect(data).toEqual(mockResponse);
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test/1')
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(mockResponse);
    });
  });

  describe('Error handling', () => {
    it('should handle 401 error and clear token', (done) => {
      sessionStorage.setItem('auth_token', 'test-token');

      service.get<any>('test').subscribe({
        error: (error) => {
          expect(error.message).toContain('Unauthorized');
          expect(sessionStorage.getItem('auth_token')).toBeNull();
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      req.flush({ message: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });
    });

    it('should handle 404 error', (done) => {
      service.get<any>('test').subscribe({
        error: (error) => {
          expect(error.message).toContain('not found');
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      req.flush(null, { status: 404, statusText: 'Not Found' });
    });

    it('should handle 500 error', (done) => {
      service.get<any>('test').subscribe({
        error: (error) => {
          expect(error.message).toContain('server error');
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('test')
      );
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});

