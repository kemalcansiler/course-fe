import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProfileService } from './profile.service';
import { ApiService } from './api.service';
import { ProfileDto, UpdateProfileRequest } from '../models/profile.model';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService, ApiService]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProfile', () => {
    it('should fetch user profile successfully', (done) => {
      const mockProfile: ProfileDto = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        profileImageUrl: 'avatar.jpg',
        dateOfBirth: '1990-01-01',
        bio: 'Test bio',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      service.getProfile().subscribe({
        next: (profile) => {
          expect(profile).toEqual(mockProfile);
          expect(service.profile()).toEqual(mockProfile);
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      expect(service.isLoading()).toBe(true);

      const req = httpMock.expectOne((request) => 
        request.url.includes('Profile')
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockProfile);
    });

    it('should handle error when fetching profile', (done) => {
      service.getProfile().subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          expect(service.isLoading()).toBe(false);
          expect(service.error()).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('Profile')
      );
      req.error(new ProgressEvent('error'));
    });
  });

  describe('updateProfile', () => {
    it('should update user profile successfully', (done) => {
      const updateRequest: UpdateProfileRequest = {
        firstName: 'Jane',
        lastName: 'Smith',
        bio: 'Updated bio',
        dateOfBirth: '1992-05-15'
      };

      const mockUpdatedProfile: ProfileDto = {
        id: '1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        profileImageUrl: null,
        dateOfBirth: '1992-05-15',
        bio: 'Updated bio',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      service.updateProfile(updateRequest).subscribe({
        next: (profile) => {
          expect(profile).toEqual(mockUpdatedProfile);
          expect(service.profile()).toEqual(mockUpdatedProfile);
          expect(service.isLoading()).toBe(false);
          done();
        }
      });

      expect(service.isLoading()).toBe(true);

      const req = httpMock.expectOne((request) => 
        request.url.includes('Profile')
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updateRequest);
      req.flush(mockUpdatedProfile);
    });

    it('should handle error when updating profile', (done) => {
      const updateRequest: UpdateProfileRequest = {
        firstName: 'Jane',
        lastName: 'Smith'
      };

      service.updateProfile(updateRequest).subscribe({
        error: (error) => {
          expect(error).toBeDefined();
          expect(service.isLoading()).toBe(false);
          expect(service.error()).toBeTruthy();
          done();
        }
      });

      const req = httpMock.expectOne((request) => 
        request.url.includes('Profile')
      );
      req.error(new ProgressEvent('error'));
    });
  });

  describe('clearProfile', () => {
    it('should clear profile data', () => {
      const mockProfile: ProfileDto = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        profileImageUrl: null,
        dateOfBirth: null,
        bio: null,
        createdAt: new Date().toISOString(),
        updatedAt: null
      };

      service.getProfile().subscribe();
      const req = httpMock.expectOne((request) => 
        request.url.includes('Profile')
      );
      req.flush(mockProfile);

      expect(service.profile()).toEqual(mockProfile);

      service.clearProfile();

      expect(service.profile()).toBeNull();
      expect(service.error()).toBeNull();
    });
  });

  describe('clearError', () => {
    it('should clear error state', () => {
      service.clearError();
      expect(service.error()).toBeNull();
    });
  });
});

