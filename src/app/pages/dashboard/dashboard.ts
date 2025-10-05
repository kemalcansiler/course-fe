import { Component, signal, inject, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PageEvent } from '@angular/material/paginator';
import { CourseCard } from '../../shared/components/course-card/course-card';
import { CourseFilters } from '../../shared/components/course-filters/course-filters';
import { CoursePagination } from '../../shared/components/course-pagination/course-pagination';
import { CourseSkeleton } from '../../shared/components/course-skeleton/course-skeleton';
import { NoDataFound } from '../../shared/components/no-data-found/no-data-found';
import { CourseService } from '../../core/services/course.service';
import { FiltersService } from '../../core/services/filters.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    DecimalPipe,
    CourseCard,
    CourseFilters,
    CoursePagination,
    CourseSkeleton,
    NoDataFound,
    MatDividerModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private courseService = inject(CourseService);
  private filtersService = inject(FiltersService);

  // Service signals
  courseData = this.courseService.courses;
  loading = this.courseService.isLoading;
  hasError = this.courseService.hasError;

  // Local state
  sortBy = signal('most-popular');
  currentFilters = signal<{ [key: string]: string[] }>({});

  ngOnInit() {
    // Load filters first, then courses
    this.filtersService.loadFilters().subscribe(() => {
      this.loadCourses();
    });
  }

  loadCourses() {
    this.courseService.loadCourses(0, 12, this.sortBy(), this.currentFilters()).subscribe();
  }

  onFilterChange(event: { key: string; value: string; checked: boolean }) {
    const currentFilters = { ...this.currentFilters() };

    if (!currentFilters[event.key]) {
      currentFilters[event.key] = [];
    }

    if (event.checked) {
      currentFilters[event.key].push(event.value);
    } else {
      currentFilters[event.key] = currentFilters[event.key].filter((v) => v !== event.value);
    }

    this.currentFilters.set(currentFilters);
    this.courseService.updateFilters(currentFilters).subscribe();
  }

  onPageChange(event: PageEvent) {
    this.courseService.updatePagination(event.pageIndex, event.pageSize).subscribe();
  }

  onSortChange(sortValue: string) {
    this.sortBy.set(sortValue);
    this.courseService.updateSorting(sortValue).subscribe();
  }

  clearFilters = () => {
    this.currentFilters.set({});
    this.loadCourses();
  };
}
