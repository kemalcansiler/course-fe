import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-course-detail-skeleton',
  imports: [MatCardModule, MatDividerModule],
  template: `
    <div class="course-detail-skeleton">
      <div class="skeleton-layout">
        <!-- Main Content Skeleton -->
        <div class="main-content-skeleton">
          <!-- Breadcrumbs Skeleton -->
          <div class="breadcrumbs-skeleton">
            <div class="skeleton-text short"></div>
            <div class="skeleton-text short"></div>
            <div class="skeleton-text short"></div>
          </div>

          <!-- Course Header Skeleton -->
          <div class="course-header-skeleton">
            <div class="course-title-skeleton">
              <div class="skeleton-text long"></div>
              <div class="skeleton-text medium"></div>
            </div>

            <div class="course-badges-skeleton">
              <div class="skeleton-badge"></div>
              <div class="skeleton-badge"></div>
            </div>

            <div class="course-meta-skeleton">
              <div class="skeleton-text medium"></div>
              <div class="skeleton-text short"></div>
              <div class="skeleton-text short"></div>
            </div>

            <div class="premium-access-skeleton">
              <div class="skeleton-text long"></div>
            </div>

            <div class="rating-section-skeleton">
              <div class="rating-skeleton">
                <div class="skeleton-text short"></div>
                <div class="stars-skeleton">
                  <div class="skeleton-star"></div>
                  <div class="skeleton-star"></div>
                  <div class="skeleton-star"></div>
                  <div class="skeleton-star"></div>
                  <div class="skeleton-star"></div>
                </div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="students-skeleton">
                <div class="skeleton-text short"></div>
              </div>
            </div>
          </div>

          <!-- What You'll Learn Skeleton -->
          <div class="what-youll-learn-skeleton">
            <div class="skeleton-text medium"></div>
            <div class="learning-points-skeleton">
              <div class="learning-point-skeleton">
                <div class="skeleton-check"></div>
                <div class="skeleton-text long"></div>
              </div>
              <div class="learning-point-skeleton">
                <div class="skeleton-check"></div>
                <div class="skeleton-text long"></div>
              </div>
              <div class="learning-point-skeleton">
                <div class="skeleton-check"></div>
                <div class="skeleton-text long"></div>
              </div>
              <div class="learning-point-skeleton">
                <div class="skeleton-check"></div>
                <div class="skeleton-text long"></div>
              </div>
            </div>
          </div>

          <!-- Course Content Skeleton -->
          <div class="course-content-skeleton">
            <div class="content-header-skeleton">
              <div class="skeleton-text medium"></div>
              <div class="skeleton-text short"></div>
            </div>
            <div class="curriculum-skeleton">
              <div class="section-skeleton">
                <div class="section-header-skeleton">
                  <div class="skeleton-text long"></div>
                  <div class="skeleton-text short"></div>
                </div>
                <div class="lessons-skeleton">
                  <div class="lesson-skeleton">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-text medium"></div>
                    <div class="skeleton-text short"></div>
                  </div>
                  <div class="lesson-skeleton">
                    <div class="skeleton-icon"></div>
                    <div class="skeleton-text medium"></div>
                    <div class="skeleton-text short"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Course Includes Skeleton -->
          <div class="course-includes-skeleton">
            <div class="skeleton-text medium"></div>
            <div class="includes-grid-skeleton">
              <div class="include-item-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="include-item-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="include-item-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="include-item-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
            </div>
          </div>

          <!-- Related Topics Skeleton -->
          <div class="related-topics-skeleton">
            <div class="skeleton-text medium"></div>
            <div class="topics-skeleton">
              <div class="skeleton-chip"></div>
              <div class="skeleton-chip"></div>
              <div class="skeleton-chip"></div>
            </div>
          </div>
        </div>

        <!-- Sidebar Skeleton -->
        <div class="sidebar-skeleton">
          <div class="video-preview-skeleton">
            <div class="video-container-skeleton">
              <div class="video-thumbnail-skeleton"></div>
              <div class="play-button-skeleton"></div>
              <div class="instructor-avatar-skeleton"></div>
            </div>
            <div class="preview-text-skeleton">
              <div class="skeleton-text short"></div>
            </div>
          </div>

          <div class="purchase-section-skeleton">
            <div class="tabs-skeleton">
              <div class="tab-skeleton"></div>
              <div class="tab-skeleton"></div>
            </div>

            <div class="subscription-option-skeleton">
              <div class="premium-info-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="subscription-text-skeleton">
                <div class="skeleton-text medium"></div>
                <div class="skeleton-text long"></div>
              </div>
              <div class="subscription-button-skeleton"></div>
              <div class="subscription-pricing-skeleton">
                <div class="skeleton-text short"></div>
                <div class="skeleton-text short"></div>
              </div>
            </div>

            <div class="divider-skeleton"></div>

            <div class="single-purchase-skeleton">
              <div class="price-display-skeleton">
                <div class="skeleton-text large"></div>
                <div class="skeleton-text medium"></div>
                <div class="skeleton-badge"></div>
              </div>
              <div class="purchase-buttons-skeleton">
                <div class="button-skeleton"></div>
                <div class="button-skeleton"></div>
              </div>
            </div>

            <div class="guarantees-skeleton">
              <div class="guarantee-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="guarantee-skeleton">
                <div class="skeleton-icon"></div>
                <div class="skeleton-text short"></div>
              </div>
            </div>

            <div class="share-section-skeleton">
              <div class="share-links-skeleton">
                <div class="skeleton-text short"></div>
                <div class="skeleton-text short"></div>
                <div class="skeleton-text short"></div>
              </div>
              <div class="coupon-section-skeleton">
                <div class="coupon-field-skeleton"></div>
                <div class="coupon-input-skeleton"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./course-detail-skeleton.scss'],
})
export class CourseDetailSkeleton {}
