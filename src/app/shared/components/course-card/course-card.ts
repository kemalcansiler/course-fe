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
          <p class="course-headline">{{ course().shortDescription }}</p>

          <div class="instructor-info">
            <span class="instructor-name">
              @if (course().instructor; as instructor) {
                {{ instructor.firstName }} {{ instructor.lastName }}
              } @else {
                Platform Instructor
              }
            </span>
          </div>

          <div class="rating-info">
            <div class="rating">
              <span class="rating-value">{{ course().rating | number: '1.1-1' }}</span>
              <div class="stars">
                @for (star of getStars(course().rating); track $index) {
                  <mat-icon class="star-icon">{{ star }}</mat-icon>
                }
              </div>
              <span class="rating-count">({{ course().reviewCount | number }})</span>
            </div>
          </div>

          <div class="course-details">
            <span class="duration">{{ getDurationText(course().duration) }}</span>
            <span class="separator">·</span>
            <span class="level">{{ getLevelText(course().level) }}</span>
            <span class="separator">·</span>
            <span class="language">{{ course().language }}</span>
          </div>
        </div>

        <div class="course-price-section">
          @if (course().price === 0) {
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

  getDurationText(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${minutes} min`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }

  getLevelText(level: string): string {
    const levelMap: Record<string, string> = {
      'BEGINNER': 'Beginner',
      'INTERMEDIATE': 'Intermediate',
      'ADVANCED': 'Advanced',
      'ALL_LEVELS': 'All Levels'
    };
    return levelMap[level] || level;
  }
}
