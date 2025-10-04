import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-no-data-found',
  imports: [MatIconModule, MatButtonModule],
  template: `
    <div class="no-data-container">
      <div class="no-data-icon">
        <mat-icon>search_off</mat-icon>
      </div>

      <h3 class="no-data-title">{{ title() }}</h3>

      <p class="no-data-message">{{ message() }}</p>

      @if (showAction()) {
        <button mat-raised-button color="primary" (click)="onActionClick()" class="action-button">
          {{ actionText() }}
        </button>
      }
    </div>
  `,
  styleUrls: ['./no-data-found.scss'],
})
export class NoDataFound {
  title = input('No Courses Found');
  message = input(
    "We couldn't find any courses matching your criteria. Try adjusting your filters or search terms.",
  );
  showAction = input(false);
  actionText = input('Clear Filters');
  actionClick = input<() => void>();

  onActionClick() {
    if (this.actionClick()) {
      this.actionClick()!();
    }
  }
}
