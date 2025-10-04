import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginationMeta } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-pagination',
  imports: [MatPaginatorModule],
  template: `
    <mat-paginator
      [length]="pagination().totalResults"
      [pageSize]="pagination().pageSize"
      [pageIndex]="pagination().currentPage"
      [showFirstLastButtons]="true"
      [hidePageSize]="true"
      (page)="onPageChange($event)"
    >
    </mat-paginator>
  `,
})
export class CoursePagination {
  pagination = input.required<PaginationMeta>();
  pageChange = output<PageEvent>();

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
