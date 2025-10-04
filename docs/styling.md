# Styling Guide

## Overview

This document outlines the styling conventions, design system, and best practices used in the Course Learning Platform.

## Design System

### Color Palette

#### Primary Colors
```scss
$primary-50: #f3f2ff;
$primary-100: #e9e7ff;
$primary-200: #d6d2ff;
$primary-300: #b8b0ff;
$primary-400: #9385ff;
$primary-500: #7c3aed; // Main primary
$primary-600: #6d28d9;
$primary-700: #5b21b6;
$primary-800: #4c1d95;
$primary-900: #3c1a78;
```

#### Secondary Colors
```scss
$secondary-50: #f8fafc;
$secondary-100: #f1f5f9;
$secondary-200: #e2e8f0;
$secondary-300: #cbd5e1;
$secondary-400: #94a3b8;
$secondary-500: #64748b;
$secondary-600: #475569;
$secondary-700: #334155;
$secondary-800: #1e293b;
$secondary-900: #0f172a;
```

#### Semantic Colors
```scss
$success: #10b981;
$warning: #f59e0b;
$error: #ef4444;
$info: #3b82f6;
```

#### Neutral Colors
```scss
$white: #ffffff;
$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-200: #e5e7eb;
$gray-300: #d1d5db;
$gray-400: #9ca3af;
$gray-500: #6b7280;
$gray-600: #4b5563;
$gray-700: #374151;
$gray-800: #1f2937;
$gray-900: #111827;
$black: #000000;
```

### Typography

#### Font Families
```scss
$font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

#### Font Sizes
```scss
$text-xs: 0.75rem;    // 12px
$text-sm: 0.875rem;   // 14px
$text-base: 1rem;     // 16px
$text-lg: 1.125rem;   // 18px
$text-xl: 1.25rem;    // 20px
$text-2xl: 1.5rem;    // 24px
$text-3xl: 1.875rem;  // 30px
$text-4xl: 2.25rem;   // 36px
$text-5xl: 3rem;      // 48px
```

#### Font Weights
```scss
$font-light: 300;
$font-normal: 400;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
$font-extrabold: 800;
```

### Spacing System

#### 8px Grid System
```scss
$space-0: 0;
$space-1: 0.25rem;  // 4px
$space-2: 0.5rem;   // 8px
$space-3: 0.75rem;  // 12px
$space-4: 1rem;     // 16px
$space-5: 1.25rem;  // 20px
$space-6: 1.5rem;   // 24px
$space-8: 2rem;     // 32px
$space-10: 2.5rem;  // 40px
$space-12: 3rem;    // 48px
$space-16: 4rem;    // 64px
$space-20: 5rem;    // 80px
$space-24: 6rem;    // 96px
```

### Border Radius

```scss
$radius-none: 0;
$radius-sm: 0.125rem;   // 2px
$radius-base: 0.25rem;  // 4px
$radius-md: 0.375rem;   // 6px
$radius-lg: 0.5rem;     // 8px
$radius-xl: 0.75rem;    // 12px
$radius-2xl: 1rem;      // 16px
$radius-full: 9999px;
```

### Shadows

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
```

## SCSS Architecture

### File Structure

```
src/
├── styles/
│   ├── _variables.scss      # Global variables
│   ├── _mixins.scss         # Reusable mixins
│   ├── _utilities.scss      # Utility classes
│   └── styles.scss          # Main stylesheet
├── app/
│   └── pages/
│       └── component/
│           └── component.scss
```

### Global Variables

```scss
// _variables.scss
:root {
  // Colors
  --color-primary: #{$primary-500};
  --color-secondary: #{$secondary-500};
  
  // Typography
  --font-family: #{$font-primary};
  --font-size-base: #{$text-base};
  
  // Spacing
  --space-unit: #{$space-2};
  
  // Breakpoints
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}
```

### Mixins

```scss
// _mixins.scss

// Responsive breakpoints
@mixin mobile {
  @media (max-width: 767px) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: 1024px) {
    @content;
  }
}

// Flexbox utilities
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// Text truncation
@mixin text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// Button styles
@mixin button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: $radius-lg;
  font-weight: $font-medium;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

## Component Styling

### BEM Methodology

```scss
// Block
.course-card {
  // Element
  &__image {
    // Modifier
    &--loading {
    }
  }
  
  &__content {
    &--expanded {
    }
  }
  
  // Modifier
  &--featured {
  }
}
```

### Component Structure

```scss
.component-name {
  // Base styles
  position: relative;
  display: flex;
  flex-direction: column;
  
  // Elements
  &__header {
    padding: $space-4;
    border-bottom: 1px solid $gray-200;
  }
  
  &__content {
    padding: $space-4;
    flex: 1;
  }
  
  &__footer {
    padding: $space-4;
    border-top: 1px solid $gray-200;
  }
  
  // Modifiers
  &--loading {
    opacity: 0.6;
    pointer-events: none;
  }
  
  &--error {
    border-color: $error;
  }
  
  // States
  &:hover {
    box-shadow: $shadow-md;
  }
  
  &:focus {
    outline: 2px solid $primary-500;
    outline-offset: 2px;
  }
  
  // Responsive
  @include mobile {
    flex-direction: column;
  }
}
```

## Responsive Design

### Breakpoint Strategy

```scss
// Mobile first approach
.component {
  // Mobile styles (default)
  padding: $space-4;
  
  // Tablet and up
  @include tablet {
    padding: $space-6;
  }
  
  // Desktop and up
  @include desktop {
    padding: $space-8;
  }
}
```

### Grid System

```scss
.grid {
  display: grid;
  gap: $space-4;
  
  &--2-cols {
    grid-template-columns: repeat(2, 1fr);
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  
  &--3-cols {
    grid-template-columns: repeat(3, 1fr);
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}
```

## Animation and Transitions

### Transition Variables

```scss
$transition-fast: 0.15s ease;
$transition-base: 0.2s ease;
$transition-slow: 0.3s ease;
```

### Common Animations

```scss
// Fade in
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// Slide up
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Shimmer loading
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

### Usage

```scss
.element {
  animation: fadeIn $transition-base;
  
  &.loading {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
}
```

## Accessibility

### Focus States

```scss
.focusable {
  &:focus {
    outline: 2px solid $primary-500;
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
  
  &:focus-visible {
    outline: 2px solid $primary-500;
    outline-offset: 2px;
  }
}
```

### High Contrast Mode

```scss
@media (prefers-contrast: high) {
  .component {
    border: 2px solid currentColor;
  }
}
```

### Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Performance

### CSS Optimization

```scss
// Use efficient selectors
.component > .element { } // Good
.component .element .nested { } // Avoid when possible

// Minimize repaints
.element {
  will-change: transform; // Only when needed
}

// Use transform for animations
.animated {
  transform: translateX(0);
  transition: transform $transition-base;
  
  &.moved {
    transform: translateX(100px);
  }
}
```

## Best Practices

### 1. Use CSS Custom Properties

```scss
.component {
  --component-padding: #{$space-4};
  --component-color: #{$primary-500};
  
  padding: var(--component-padding);
  color: var(--component-color);
}
```

### 2. Consistent Naming

```scss
// Use descriptive names
.course-card-header-title { } // Good
.ch1 { } // Bad

// Use consistent prefixes
.course-card { }
.course-list { }
.course-detail { }
```

### 3. Modular Styles

```scss
// Keep component styles in component files
// Use global styles sparingly
// Extract common patterns into mixins
```

### 4. Mobile First

```scss
// Start with mobile styles
.component {
  // Mobile styles
  
  @include tablet {
    // Tablet styles
  }
  
  @include desktop {
    // Desktop styles
  }
}
```

### 5. Use Semantic Colors

```scss
// Use semantic color names
.error { color: $error; }
.success { color: $success; }
.warning { color: $warning; }

// Instead of specific color names
.red { color: #ef4444; }
```
