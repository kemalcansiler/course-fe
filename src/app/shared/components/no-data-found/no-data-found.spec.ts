import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoDataFound } from './no-data-found';

describe('NoDataFound Component', () => {
  let component: NoDataFound;
  let fixture: ComponentFixture<NoDataFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoDataFound]
    }).compileComponents();

    fixture = TestBed.createComponent(NoDataFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render no data message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.no-data-container')).toBeTruthy();
  });
});

