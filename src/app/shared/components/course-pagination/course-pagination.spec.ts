import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageEvent } from '@angular/material/paginator';
import { CoursePagination } from './course-pagination';

describe('CoursePagination Component', () => {
  let component: CoursePagination;
  let fixture: ComponentFixture<CoursePagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoursePagination,
        BrowserAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CoursePagination);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('pagination', {
      currentPage: 0,
      pageSize: 10,
      totalResults: 100,
      totalPages: 10,
      pageCount: 10
    });
    fixture.detectChanges();
    
    expect(component).toBeTruthy();
  });

  it('should display pagination with correct values', () => {
    const mockPagination = {
      currentPage: 0,
      pageSize: 10,
      totalResults: 100,
      totalPages: 10,
      pageCount: 10
    };

    fixture.componentRef.setInput('pagination', mockPagination);
    fixture.detectChanges();

    expect(component.pagination()).toEqual(mockPagination);
  });

  it('should emit page change event', () => {
    const mockPagination = {
      currentPage: 0,
      pageSize: 10,
      totalResults: 100,
      totalPages: 10,
      pageCount: 10
    };

    fixture.componentRef.setInput('pagination', mockPagination);
    fixture.detectChanges();

    spyOn(component.pageChange, 'emit');

    const pageEvent: PageEvent = {
      pageIndex: 1,
      pageSize: 10,
      length: 100
    };

    component.onPageChange(pageEvent);

    expect(component.pageChange.emit).toHaveBeenCalledWith(pageEvent);
  });

  it('should handle large result sets', () => {
    const mockPagination = {
      currentPage: 5,
      pageSize: 20,
      totalResults: 1000,
      totalPages: 50,
      pageCount: 50
    };

    fixture.componentRef.setInput('pagination', mockPagination);
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-paginator')).toBeTruthy();
  });

  it('should handle zero results', () => {
    const mockPagination = {
      currentPage: 0,
      pageSize: 10,
      totalResults: 0,
      totalPages: 0,
      pageCount: 0
    };

    fixture.componentRef.setInput('pagination', mockPagination);
    fixture.detectChanges();

    expect(component.pagination().totalResults).toBe(0);
  });
});

