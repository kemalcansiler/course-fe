import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseSkeleton } from './course-skeleton';

describe('CourseSkeleton Component', () => {
  let component: CourseSkeleton;
  let fixture: ComponentFixture<CourseSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseSkeleton]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseSkeleton);
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

