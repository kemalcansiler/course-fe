import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseDetailSkeleton } from './course-detail-skeleton';

describe('CourseDetailSkeleton Component', () => {
  let component: CourseDetailSkeleton;
  let fixture: ComponentFixture<CourseDetailSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseDetailSkeleton]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseDetailSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render skeleton structure', () => {
    const compiled = fixture.nativeElement;
    const skeletonElement = compiled.querySelector('[class*="skeleton"]');
    expect(skeletonElement).toBeTruthy();
  });
});

