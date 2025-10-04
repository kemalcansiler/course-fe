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