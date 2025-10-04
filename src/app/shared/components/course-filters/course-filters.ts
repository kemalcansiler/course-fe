import { Component, input, output, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FilterOption } from '../../../core/models/course.model';

@Component({
  selector: 'app-course-filters',
  imports: [
    MatExpansionModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="filters-container">
      <!-- Mobile Filter Button -->
      <div class="mobile-filter-header">
        <button mat-raised-button (click)="toggleMobileFilters()" class="mobile-filter-button">
          <mat-icon>filter_list</mat-icon>
          Filter
        </button>
      </div>

      <!-- Desktop Filters -->
      <div class="desktop-filters">
        @for (filter of filters(); track filter.key) {
          <mat-expansion-panel class="filter-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>{{ filter.label }}</mat-panel-title>
            </mat-expansion-panel-header>
            
            <div class="filter-options">
              @for (option of filter.options; track option.value) {
                <div class="filter-option">
                  <mat-checkbox 
                    [checked]="option.isSelected"
                    (change)="onFilterChange(filter.key, option.value, $event.checked)"
                    class="filter-checkbox"
                  >
                    {{ option.label }}
                  </mat-checkbox>
                  <span class="option-count">({{ option.count }})</span>
                </div>
              }
            </div>
          </mat-expansion-panel>
        }
      </div>

      <!-- Mobile Collapsible Filters -->
      <div class="mobile-filters" [class.expanded]="mobileFiltersOpen()">
        @for (filter of filters(); track filter.key) {
          <mat-expansion-panel class="filter-panel">
            <mat-expansion-panel-header>
              <mat-panel-title>{{ filter.label }}</mat-panel-title>
            </mat-expansion-panel-header>
            
            <div class="filter-options">
              @for (option of filter.options; track option.value) {
                <div class="filter-option">
                  <mat-checkbox 
                    [checked]="option.isSelected"
                    (change)="onFilterChange(filter.key, option.value, $event.checked)"
                    class="filter-checkbox"
                  >
                    {{ option.label }}
                  </mat-checkbox>
                  <span class="option-count">({{ option.count }})</span>
                </div>
              }
            </div>
          </mat-expansion-panel>
        }
      </div>
    </div>
  `,
  styleUrls: ['./course-filters.scss'],
})
export class CourseFilters {
  filters = input.required<FilterOption[]>();
  filterChange = output<{ key: string; value: string; checked: boolean }>();

  mobileFiltersOpen = signal(false);

  toggleMobileFilters() {
    this.mobileFiltersOpen.update(open => !open);
  }

  onFilterChange(key: string, value: string, checked: boolean) {
    this.filterChange.emit({ key, value, checked });
  }
}
