import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CourseDetailService } from '../../core/services/course-detail.service';
import { CoursePricing } from '../../core/models/course-detail.model';
import { CourseDetailSkeleton } from '../../shared/components/course-detail-skeleton/course-detail-skeleton';

@Component({
  selector: 'app-course-detail',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    CourseDetailSkeleton,
    DecimalPipe,
    DatePipe,
  ],
  templateUrl: './course-detail.html',
  styleUrls: ['./course-detail.scss'],
})
export class CourseDetail implements OnInit {
  private courseDetailService = inject(CourseDetailService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Service signals
  course = this.courseDetailService.course;
  loading = this.courseDetailService.isLoading;
  hasError = this.courseDetailService.hasError;

  // Local state
  pricing = signal<CoursePricing>({
    originalPrice: 0,
    currentPrice: 0,
    discountPercentage: 0,
    currency: '₺',
    isOnSale: false,
    subscriptionPrice: 0,
    subscriptionTrialDays: 0,
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.loadCourseDetail(courseId);
        this.loadPricing(courseId);
      }
    });
  }

  loadCourseDetail(courseId: string) {
    this.courseDetailService.loadCourseDetail(courseId).subscribe({
      next: (courseDetail) => {
        // Data is already set in the service
      },
      error: (error) => {
        console.error('Error loading course detail:', error);
      },
    });
  }

  loadPricing(courseId: string) {
    this.courseDetailService.getCoursePricing(courseId).subscribe((pricing) => {
      this.pricing.set(pricing);
    });
  }

  toggleSection(sectionId: string) {
    this.courseDetailService.toggleSection(sectionId);
  }

  expandAllSections() {
    this.courseDetailService.expandAllSections();
  }

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

  getLessonIcon(type: string): string {
    switch (type) {
      case 'video':
        return 'play_circle_outline';
      case 'quiz':
        return 'quiz';
      case 'article':
        return 'article';
      default:
        return 'play_circle_outline';
    }
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
