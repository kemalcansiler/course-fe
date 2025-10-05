import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CourseCard } from './course-card';
import { Course } from '../../../core/models/course.model';

describe('CourseCard Component', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    title: 'Test Course',
    description: 'Test Description',
    shortDescription: 'Short description',
    imageUrl: 'test-image.jpg',
    videoUrl: 'test-video.mp4',
    price: 99.99,
    discountPrice: 79.99,
    duration: 120,
    level: 'Beginner',
    language: 'English',
    isFeatured: false,
    rating: 4.5,
    reviewCount: 100,
    enrollmentCount: 500,
    createdAt: '2024-01-01',
    category: {
      id: 1,
      name: 'Programming',
      description: '',
      imageUrl: ''
    },
    instructor: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      profileImageUrl: '',
      dateOfBirth: '',
      bio: '',
      createdAt: new Date().toISOString()
    }
  };

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate', 'createUrlTree', 'serializeUrl'], {
      events: new Subject()
    });
    routerSpy.createUrlTree.and.returnValue({} as any);
    routerSpy.serializeUrl.and.returnValue('/');

    await TestBed.configureTestingModule({
      imports: [CourseCard],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display course information', () => {
    fixture.componentRef.setInput('course', mockCourse);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Course');
  });

  it('should calculate duration text correctly', () => {
    const durationText = component.getDurationText(120);
    expect(durationText).toBe('2 hours');
  });

  it('should generate correct star array', () => {
    const stars = component.getStars(4.5);
    expect(stars.length).toBe(5);
    expect(stars.filter(s => s === 'star').length).toBe(4);
    expect(stars.filter(s => s === 'star_half').length).toBe(1);
  });

  it('should display price', () => {
    fixture.componentRef.setInput('course', mockCourse);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.price')).toBeTruthy();
  });

  it('should display rating', () => {
    fixture.componentRef.setInput('course', mockCourse);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('4.5');
  });

  it('should format level text correctly', () => {
    expect(component.getLevelText('BEGINNER')).toBe('Beginner');
    expect(component.getLevelText('INTERMEDIATE')).toBe('Intermediate');
    expect(component.getLevelText('ADVANCED')).toBe('Advanced');
  });
});

