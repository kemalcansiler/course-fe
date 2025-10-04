import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-course-skeleton',
  imports: [MatCardModule],
  template: `
    <div class="skeleton-item">
      <div class="skeleton-image"></div>

      <div class="skeleton-content">
        <div class="skeleton-main-info">
          <div class="skeleton-title"></div>
          <div class="skeleton-headline"></div>
          <div class="skeleton-headline short"></div>

          <div class="skeleton-instructor"></div>

          <div class="skeleton-rating">
            <div class="skeleton-stars"></div>
            <div class="skeleton-rating-count"></div>
          </div>

          <div class="skeleton-details">
            <div class="skeleton-detail"></div>
            <div class="skeleton-detail"></div>
            <div class="skeleton-detail"></div>
          </div>
        </div>

        <div class="skeleton-price"></div>
      </div>
    </div>
  `,
  styleUrls: ['./course-skeleton.scss'],
})
export class CourseSkeleton {
  count = input(6); // Default to 6 skeleton items
}
