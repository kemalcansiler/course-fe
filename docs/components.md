# Component Documentation

## Overview

This document provides detailed information about all components in the Course Learning Platform.

## Page Components

### Dashboard Component

**Location**: `src/app/pages/dashboard/`

**Purpose**: Main course listing page with search, filters, and pagination.

**Features**:
- Course grid/list view
- Advanced filtering system
- Search functionality
- Sorting options
- Pagination controls
- Responsive design
- Skeleton loading states

**Key Methods**:
- `loadCourses()` - Load courses from service
- `onFilterChange()` - Handle filter updates
- `onSortChange()` - Handle sorting changes
- `onPageChange()` - Handle pagination
- `clearFilters()` - Reset all filters

**Dependencies**:
- CourseService
- CourseCard
- CourseFilters
- CoursePagination
- CourseSkeleton
- NoDataFound

### Course Detail Component

**Location**: `src/app/pages/course-detail/`

**Purpose**: Individual course information and enrollment page.

**Features**:
- Course header with metadata
- Curriculum sections
- Instructor information
- Pricing and enrollment
- Related topics
- Responsive layout
- Skeleton loading

**Key Methods**:
- `loadCourseDetail()` - Load course details
- `loadPricing()` - Load pricing information
- `toggleSection()` - Toggle curriculum sections
- `expandAllSections()` - Expand all sections
- `getStars()` - Generate star rating display
- `getLessonIcon()` - Get lesson type icon

**Dependencies**:
- CourseDetailService
- CourseDetailSkeleton

## Shared Components

### Course Card Component

**Location**: `src/app/shared/components/course-card/`

**Purpose**: Displays course preview information in a card format.

**Inputs**:
- `course: Course` - Course data to display

**Features**:
- Course image
- Title and headline
- Instructor information
- Rating display
- Course details (duration, lectures, level)
- Price display
- Click navigation to detail page

**Styling**:
- List item layout with dividers
- Responsive design
- Hover effects
- Star rating display

### Course Filters Component

**Location**: `src/app/shared/components/course-filters/`

**Purpose**: Advanced filtering system for course search.

**Features**:
- Category filters
- Level filters
- Price range filters
- Duration filters
- Collapsible on mobile
- Filter count display

**Outputs**:
- `filterChange` - Emits when filters change

### Course Pagination Component

**Location**: `src/app/shared/components/course-pagination/`

**Purpose**: Navigation controls for course pages.

**Features**:
- Page navigation
- Page size selection
- Results count display
- Responsive design

**Inputs**:
- `pagination: PaginationMeta` - Pagination data

**Outputs**:
- `pageChange` - Emits when page changes

### Course Skeleton Component

**Location**: `src/app/shared/components/course-skeleton/`

**Purpose**: Loading state for course cards.

**Features**:
- Shimmer animation
- Matches course card layout
- Responsive design

### Course Detail Skeleton Component

**Location**: `src/app/shared/components/course-detail-skeleton/`

**Purpose**: Loading state for course detail page.

**Features**:
- Complete page skeleton
- Matches course detail layout
- Background styling
- Responsive design

### No Data Found Component

**Location**: `src/app/shared/components/no-data-found/`

**Purpose**: Empty state when no courses are found.

**Features**:
- Empty state illustration
- Helpful message
- Action buttons
- Responsive design

## Layout Components

### Header Component

**Location**: `src/app/pages/layout/header/`

**Purpose**: Main navigation header with mobile menu.

**Features**:
- Logo/brand
- Navigation menu
- Mobile hamburger menu
- User account section
- Responsive design

**Mobile Features**:
- Sidenav container
- Overlay menu
- Touch-friendly navigation

### Footer Component

**Location**: `src/app/pages/layout/footer/`

**Purpose**: Page footer with links and information.

**Features**:
- Company information
- Quick links
- Social media links
- Copyright information

## Component Architecture

### Standalone Components

All components are standalone Angular components:

```typescript
@Component({
  selector: 'app-component-name',
  imports: [/* dependencies */],
  template: `<!-- template -->`,
  styleUrls: ['./component.scss']
})
export class ComponentName {
  // Component logic
}
```

### Signal-based State Management

Components use Angular signals for reactive state:

```typescript
// Service signals
course = this.courseService.course;
loading = this.courseService.isLoading;

// Local signals
localState = signal(initialValue);
```

### Input/Output Pattern

```typescript
// Inputs
course = input.required<Course>();

// Outputs
filterChange = output<FilterData>();
```

## Styling Guidelines

### SCSS Structure

```scss
.component-name {
  // Base styles
  
  &__element {
    // Element styles
  }
  
  &--modifier {
    // Modifier styles
  }
  
  @media (max-width: 768px) {
    // Mobile styles
  }
}
```

### Material Design Integration

- Use Angular Material components
- Follow Material Design principles
- Implement proper theming
- Use Material icons
- Apply Material typography

### Responsive Design

- Mobile-first approach
- Breakpoints: 768px, 1024px
- Flexible layouts
- Touch-friendly interactions

## Testing

### Unit Tests

Each component should have corresponding unit tests:

```typescript
describe('ComponentName', () => {
  let component: ComponentName;
  let fixture: ComponentFixture<ComponentName>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentName]
    });
    fixture = TestBed.createComponent(ComponentName);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### Testing Guidelines

- Test component initialization
- Test input/output behavior
- Test user interactions
- Test responsive behavior
- Mock external dependencies

## Performance Considerations

### OnPush Change Detection

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### Lazy Loading

```typescript
// Route configuration
{
  path: 'course/:id',
  loadComponent: () => import('./course-detail/course-detail')
}
```

### Image Optimization

```typescript
// Use NgOptimizedImage
<img [ngSrc]="imageUrl" [alt]="altText" width="240" height="135">
```

## Accessibility

### ARIA Labels

```html
<button [attr.aria-label]="buttonLabel">
  <mat-icon>icon</mat-icon>
</button>
```

### Keyboard Navigation

- Tab order
- Focus management
- Keyboard shortcuts
- Screen reader support

### Color Contrast

- WCAG AA compliance
- High contrast mode support
- Color-blind friendly design
