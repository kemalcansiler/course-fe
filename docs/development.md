# Development Guide

## Overview

This guide provides comprehensive information for developers working on the Course Learning Platform frontend.

## Getting Started

### Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+ or **yarn** 1.22+
- **Angular CLI** 20+
- **Git** 2.30+

### Environment Setup

1. **Install Angular CLI globally**
   ```bash
   npm install -g @angular/cli@20
   ```

2. **Clone and setup project**
   ```bash
   git clone <repository-url>
   cd course-fe
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   ```
   http://localhost:4200
   ```

## Project Architecture

### Angular Standalone Components

The project uses Angular's standalone component architecture:

```typescript
@Component({
  selector: 'app-example',
  imports: [CommonModule, MatButtonModule],
  template: `<!-- template -->`,
  styleUrls: ['./example.scss']
})
export class ExampleComponent {
  // Component logic
}
```

### Signal-based State Management

Modern Angular signals for reactive state management:

```typescript
// Service
export class DataService {
  private data = signal<Data[]>([]);
  private loading = signal(false);
  
  // Public signals
  data = computed(() => this.data());
  isLoading = computed(() => this.loading());
}

// Component
export class ExampleComponent {
  data = this.dataService.data;
  loading = this.dataService.isLoading;
}
```

### File Structure

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── models/             # TypeScript interfaces
│   │   ├── services/           # Business logic
│   │   └── guards/             # Route guards
│   ├── pages/                  # Page components
│   │   ├── dashboard/          # Course listing
│   │   ├── course-detail/      # Course details
│   │   └── auth/               # Authentication
│   ├── shared/                 # Reusable components
│   │   └── components/         # UI components
│   ├── layout/                 # Layout components
│   │   ├── header/             # Navigation
│   │   └── footer/             # Footer
│   ├── app.routes.ts           # Route configuration
│   └── app.config.ts           # App configuration
├── assets/                     # Static assets
├── styles/                     # Global styles
└── environments/               # Environment configs
```

## Development Workflow

### 1. Feature Development

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# Test changes
npm test

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### 2. Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check

# Build check
npm run build
```

### 3. Testing

```bash
# Unit tests
npm test

# E2E tests
npm run e2e

# Test coverage
npm run test:coverage
```

## Coding Standards

### TypeScript

#### Strict Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

#### Type Definitions
```typescript
// Use interfaces for object shapes
interface User {
  id: string;
  name: string;
  email: string;
}

// Use types for unions and computed types
type Status = 'loading' | 'success' | 'error';
type UserWithStatus = User & { status: Status };

// Use enums for constants
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

#### Function Signatures
```typescript
// Use explicit return types for public methods
public getUser(id: string): Observable<User> {
  return this.http.get<User>(`/api/users/${id}`);
}

// Use arrow functions for simple operations
const processData = (data: Data[]): ProcessedData[] => 
  data.map(item => ({ ...item, processed: true }));
```

### Angular Best Practices

#### Component Design
```typescript
@Component({
  selector: 'app-example',
  imports: [CommonModule, MatButtonModule],
  template: `
    <div class="example">
      @if (loading()) {
        <app-skeleton></app-skeleton>
      } @else {
        <div class="content">
          {{ data() }}
        </div>
      }
    </div>
  `,
  styleUrls: ['./example.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent implements OnInit {
  // Use input() and output() functions
  data = input.required<string>();
  loading = input(false);
  dataChange = output<string>();
  
  // Inject dependencies
  private service = inject(DataService);
  
  ngOnInit() {
    // Component initialization
  }
}
```

#### Service Design
```typescript
@Injectable({ providedIn: 'root' })
export class DataService {
  private data = signal<Data[]>([]);
  private loading = signal(false);
  private error = signal<string | null>(null);
  
  // Public signals
  data = computed(() => this.data());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());
  
  // Public methods
  loadData(): Observable<Data[]> {
    this.loading.set(true);
    this.error.set(null);
    
    return this.http.get<Data[]>('/api/data').pipe(
      tap(data => {
        this.data.set(data);
        this.loading.set(false);
      }),
      catchError(error => {
        this.error.set('Failed to load data');
        this.loading.set(false);
        return throwError(error);
      })
    );
  }
}
```

#### Template Best Practices
```html
<!-- Use @if instead of *ngIf -->
@if (loading()) {
  <app-skeleton></app-skeleton>
} @else if (error()) {
  <app-error [message]="error()"></app-error>
} @else {
  <div class="content">
    @for (item of data(); track item.id) {
      <app-item [data]="item"></app-item>
    }
  </div>
}

<!-- Use class binding instead of ngClass -->
<div [class.active]="isActive()" [class.disabled]="isDisabled()">
  Content
</div>

<!-- Use style binding instead of ngStyle -->
<div [style.width.px]="width()" [style.height.px]="height()">
  Content
</div>
```

### SCSS Guidelines

#### BEM Methodology
```scss
// Block
.course-card {
  // Element
  &__header {
    &__title {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }
  
  &__content {
    padding: 1rem;
  }
  
  // Modifier
  &--featured {
    border: 2px solid $primary-500;
  }
  
  &--loading {
    opacity: 0.6;
  }
}
```

#### Responsive Design
```scss
.component {
  // Mobile first
  padding: 1rem;
  
  // Tablet and up
  @media (min-width: 768px) {
    padding: 1.5rem;
  }
  
  // Desktop and up
  @media (min-width: 1024px) {
    padding: 2rem;
  }
}
```

## Testing Strategy

### Unit Testing

#### Component Testing
```typescript
describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;
  let service: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('DataService', ['loadData']);
    
    TestBed.configureTestingModule({
      imports: [ExampleComponent],
      providers: [
        { provide: DataService, useValue: serviceSpy }
      ]
    });
    
    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    const mockData = [{ id: '1', name: 'Test' }];
    service.loadData.and.returnValue(of(mockData));
    
    component.ngOnInit();
    
    expect(service.loadData).toHaveBeenCalled();
  });
});
```

#### Service Testing
```typescript
describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });
    
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should load data', () => {
    const mockData = [{ id: '1', name: 'Test' }];
    
    service.loadData().subscribe(data => {
      expect(data).toEqual(mockData);
    });
    
    const req = httpMock.expectOne('/api/data');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
```

### E2E Testing

```typescript
describe('Course Detail Page', () => {
  it('should display course information', () => {
    cy.visit('/course/123');
    
    cy.get('[data-cy=course-title]').should('be.visible');
    cy.get('[data-cy=course-instructor]').should('contain', 'John Doe');
    cy.get('[data-cy=course-rating]').should('be.visible');
  });
  
  it('should navigate to enrollment', () => {
    cy.visit('/course/123');
    cy.get('[data-cy=enroll-button]').click();
    cy.url().should('include', '/enroll');
  });
});
```

## Performance Optimization

### OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  // Component will only check for changes when:
  // 1. Input properties change
  // 2. Events are emitted
  // 3. Observables emit
  // 4. Manual change detection is triggered
}
```

### Lazy Loading
```typescript
// Route configuration
export const routes: Routes = [
  {
    path: 'course/:id',
    loadComponent: () => import('./course-detail/course-detail')
      .then(m => m.CourseDetail)
  }
];
```

### Image Optimization
```typescript
// Use NgOptimizedImage
<img 
  [ngSrc]="course.imageUrl" 
  [alt]="course.title"
  width="240" 
  height="135"
  priority="false"
/>
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/stats.json
```

## Debugging

### Angular DevTools
1. Install Angular DevTools browser extension
2. Use for component inspection and profiling
3. Monitor change detection cycles

### Console Debugging
```typescript
// Use Angular's built-in debugging
import { isDevMode } from '@angular/core';

if (isDevMode()) {
  console.log('Debug information:', data);
}
```

### Source Maps
```typescript
// Enable source maps in development
"sourceMap": true,
"optimization": false
```

## Deployment

### Build Configuration
```bash
# Development build
npm run build

# Production build
npm run build -- --configuration=production

# Build with environment variables
npm run build -- --configuration=production --environment=prod
```

### Environment Configuration
```typescript
// environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com',
  version: '1.0.0'
};
```

### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist/course-fe /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Troubleshooting

### Common Issues

#### 1. Change Detection Issues
```typescript
// Problem: Component not updating
// Solution: Use signals or trigger change detection
this.cdr.detectChanges();
```

#### 2. Memory Leaks
```typescript
// Problem: Subscriptions not unsubscribed
// Solution: Use takeUntil pattern
private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// In subscription
this.service.getData()
  .pipe(takeUntil(this.destroy$))
  .subscribe(data => {});
```

#### 3. Circular Dependencies
```typescript
// Problem: Circular dependency error
// Solution: Use forwardRef or restructure code
constructor(
  @Inject(forwardRef(() => OtherService)) private otherService: OtherService
) {}
```

### Performance Issues

#### 1. Slow Rendering
- Use OnPush change detection
- Implement virtual scrolling for large lists
- Optimize template expressions

#### 2. Large Bundle Size
- Use lazy loading
- Tree shake unused code
- Optimize images and assets

#### 3. Memory Issues
- Unsubscribe from observables
- Use trackBy functions in *ngFor
- Avoid creating objects in templates

## Resources

### Documentation
- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [RxJS Documentation](https://rxjs.dev/)

### Tools
- [Angular CLI](https://cli.angular.io/)
- [Angular DevTools](https://angular.io/guide/devtools)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Best Practices
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Angular Material Design](https://material.angular.io/guide/theming)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
