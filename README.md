# Course Learning Platform - Frontend

A modern Angular-based course learning platform built with Angular Material and TypeScript.

## 🚀 Features

- **Course Dashboard** - Browse and search courses with advanced filtering
- **Course Detail Pages** - Comprehensive course information and enrollment
- **Responsive Design** - Mobile-first approach with Material Design
- **Modern UI/UX** - Clean, professional interface with skeleton loading
- **Real-time Search** - Instant course filtering and sorting
- **Pagination** - Server-side compatible pagination system

## 🛠️ Tech Stack

- **Angular 20** - Latest Angular framework with standalone components
- **Angular Material** - UI component library
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming
- **SCSS** - Enhanced CSS with variables and mixins
- **Signals** - Modern Angular state management

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd course-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open in browser**
   ```
   http://localhost:4200
   ```

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                    # Core services and models
│   │   ├── models/             # TypeScript interfaces
│   │   └── services/           # Business logic services
│   ├── pages/                  # Page components
│   │   ├── dashboard/          # Course listing page
│   │   ├── course-detail/      # Course detail page
│   │   └── auth/               # Authentication pages
│   ├── shared/                 # Reusable components
│   │   └── components/         # Shared UI components
│   └── layout/                 # Layout components
│       ├── header/             # Navigation header
│       └── footer/             # Page footer
├── assets/                     # Static assets
└── styles/                     # Global styles
```

## 🎯 Key Components

### Pages
- **Dashboard** - Course listing with filters and search
- **Course Detail** - Individual course information and enrollment
- **Authentication** - Login and registration pages

### Shared Components
- **Course Card** - Course preview component
- **Course Filters** - Advanced filtering system
- **Course Pagination** - Navigation controls
- **Skeleton Loaders** - Loading state components

### Services
- **Course Service** - Course data management
- **Course Detail Service** - Detailed course information
- **Auth Service** - Authentication handling

## 🎨 Design System

- **Material Design 3** - Google's latest design system
- **Responsive Breakpoints** - Mobile, tablet, and desktop
- **Color Palette** - Consistent brand colors
- **Typography** - Material Design typography scale
- **Spacing** - 8px grid system

## 🔧 Development

### Available Scripts

```bash
# Development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm test -- --code-coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Code Style

- **TypeScript strict mode** enabled
- **Angular standalone components** preferred
- **Signals** for state management
- **Reactive forms** over template-driven
- **SCSS** for styling with BEM methodology

## 🧪 Testing

The project uses Jasmine and Karma for unit testing with comprehensive test coverage.

### Test Structure
```
src/app/
├── core/
│   ├── services/
│   │   ├── auth.service.spec.ts       # Authentication service tests
│   │   ├── course.service.spec.ts     # Course service tests
│   │   └── api.service.spec.ts        # HTTP service tests
│   └── guards/
│       └── auth.guard.spec.ts         # Route guard tests
├── pages/
│   └── auth/login/
│       └── login.spec.ts              # Login component tests
└── shared/components/
    └── course-card/
        └── course-card.spec.ts        # Component tests
```

### Running Tests

**Run tests in watch mode:**
```bash
npm test
```

**Run tests once (CI mode):**
```bash
npm test -- --watch=false
```

**Run tests with code coverage:**
```bash
npm test -- --code-coverage --watch=false
```

**Run tests in headless browser:**
```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

**Run specific test file:**
```bash
npm test -- --include='**/auth.service.spec.ts'
```

### Test Coverage

The test suite includes **123 comprehensive tests** covering:
- ✅ **Core Services** (39 tests) - Auth, Course, API, Profile, Filters, CourseDetail services
- ✅ **Auth Guards** (4 tests) - Route protection logic (authGuard, guestGuard)
- ✅ **Components** (80 tests) - Login, Register, Dashboard, CourseDetail, Header, Footer, and all shared components

**Test Breakdown by Module:**
- **Services**: AuthService, CourseService, ApiService, ProfileService, FiltersService, CourseDetailService
- **Guards**: Auth guards for protected and public routes
- **Pages**: Login, Register, Dashboard, CourseDetail, Profile
- **Layout**: Header, Footer components with authentication state
- **Shared Components**: CourseCard, CoursePagination, UserMenu, NoDataFound, Skeleton loaders

**Current Coverage:**
- **Lines**: 85.41% (369/432)
- **Statements**: 85.06% (410/482)
- **Functions**: 80.55% (116/144)
- **Branches**: 73.58% (78/106)

### Coverage Reports

After running tests with coverage, view the report:
```bash
# Coverage report location
open coverage/index.html
```

### Testing Technologies
- **Jasmine** - Behavior-driven testing framework
- **Karma** - Test runner
- **ChromeHeadless** - Headless browser for CI/CD
- **karma-coverage** - Code coverage reporting
- **HttpClientTestingModule** - HTTP request mocking

### Example Test Run Output
```
Chrome Headless: Executed 123 of 123 SUCCESS (0.563 secs / 0.529 secs)
TOTAL: 123 SUCCESS

=============================== Coverage summary ===============================
Statements   : 85.06% ( 410/482 )
Branches     : 73.58% ( 78/106 )
Functions    : 80.55% ( 116/144 )
Lines        : 85.41% ( 369/432 )
================================================================================
```

### Writing Tests

**Service Test Example:**
```typescript
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, ApiService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should login successfully', (done) => {
    const mockResponse = { token: 'test-token', user: {...} };
    
    service.login(credentials).subscribe(response => {
      expect(response.token).toBe('test-token');
      done();
    });

    const req = httpMock.expectOne(url => url.includes('auth/login'));
    req.flush(mockResponse);
  });
});
```

**Component Test Example:**
```typescript
describe('LoginComponent', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
  });

  it('should validate email field', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.hasError('email')).toBe(true);
  });
});
```

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Breakpoints**:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

## 🚀 Deployment

The application is built for production with:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📚 Documentation

Detailed documentation is available in the `/docs` folder:

- [Component Documentation](./docs/components.md)
- [Styling Guide](./docs/styling.md)
- [Development Guide](./docs/development.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [Angular Documentation](https://angular.io/docs)
- [Angular Material](https://material.angular.io/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)