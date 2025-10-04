import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgOptimizedImage, DecimalPipe } from '@angular/common';
import { Course } from '../../../core/models/course.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-course-card',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    NgOptimizedImage,
    DecimalPipe,
    RouterLink,
  ],
  template: `
    <div class="course-list-item" [routerLink]="['/course', course().id]">
      <div class="course-image-container">
        <img
          [ngSrc]="course().imageUrl"
          [alt]="course().title"
          width="240"
          height="135"
          class="course-image"
          priority="false"
        />
      </div>

      <div class="course-content">
        <div class="course-main-info">
          <h3 class="course-title">{{ course().title }}</h3>
          <p class="course-headline">{{ course().headline }}</p>

          <div class="instructor-info">
            <span class="instructor-name">{{ course().instructorName }}</span>
          </div>

          <div class="rating-info">
            <div class="rating">
              <span class="rating-value">{{ course().averageRating | number: '1.1-1' }}</span>
              <div class="stars">
                @for (star of getStars(course().averageRating); track $index) {
                  <mat-icon class="star-icon">{{ star }}</mat-icon>
                }
              </div>
              <span class="rating-count">({{ course().ratingCount | number }})</span>
            </div>
          </div>

          <div class="course-details">
            <span class="duration">{{ course().totalHours | number: '1.1-1' }} total hours</span>
            <span class="separator">·</span>
            <span class="lectures">{{ course().lectureCount }} lectures</span>
            <span class="separator">·</span>
            <span class="level">{{ course().level }}</span>
          </div>
        </div>

        <div class="course-price-section">
          @if (course().isFree) {
            <span class="price free">Free</span>
          } @else {
            <span class="price">₺{{ course().price | number: '1.2-2' }}</span>
          }
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./course-card.scss'],
})
export class CourseCard {
  course = input.required<Course>();

  getStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }

    if (hasHalfStar) {
      stars.push('star_half');
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push('star_border');
    }

    return stars;
  }
}
