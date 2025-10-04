# Authentication System Implementation

This document describes the authentication system implemented for the course-fe Angular application.

## Overview

The authentication system includes:
- Mock authentication service with sessionStorage
- Route guards for protected and guest routes
- User interface updates for authenticated state
- App initialization to check existing authentication

## Components Created/Modified

### 1. Models (`src/app/core/models/user.model.ts`)
- `User` interface for user data
- `LoginRequest` and `RegisterRequest` interfaces
- `AuthResponse` and `MeResponse` interfaces

### 2. Services

#### AuthService (`src/app/core/services/auth.service.ts`)
- Mock authentication service using sessionStorage
- Signals for reactive state management
- Methods: `login()`, `register()`, `getMe()`, `logout()`
- Automatic token and user data persistence

#### AppInitializerService (`src/app/core/services/app-initializer.service.ts`)
- Checks for existing authentication on app startup
- Calls `getMe()` if token exists
- Clears invalid authentication data

### 3. Guards (`src/app/core/guards/auth.guard.ts`)
- `authGuard`: Protects routes requiring authentication
- `guestGuard`: Redirects authenticated users away from login/register

### 4. Components

#### UserMenu (`src/app/shared/components/user-menu/user-menu.ts`)
- Dropdown menu for authenticated users
- Shows user avatar, name, and email
- Profile, Settings, and Logout options

#### Updated Header (`src/app/pages/layout/header/header.ts`)
- Shows user menu when authenticated
- Shows login/register buttons when not authenticated
- Mobile menu includes user information
- Loading state during authentication

#### Updated Login/Register Components
- Integrated with AuthService
- Loading states and error handling
- Success/error notifications via MatSnackBar

## Features

### Authentication Flow
1. User visits login/register page (guest guard redirects if already authenticated)
2. User submits form with email (login) or email + full name (register)
3. Mock service validates and creates user data
4. Token and user data stored in sessionStorage
5. User redirected to dashboard
6. Header shows user menu instead of login/register buttons

### App Initialization
1. App starts and checks for existing token in sessionStorage
2. If token exists, calls `getMe()` to validate and load user data
3. If validation fails, clears authentication data
4. UI updates based on authentication state

### Route Protection
- Dashboard and course detail pages require authentication
- Login and register pages redirect authenticated users to dashboard
- Guards handle redirects with return URL for login

### User Interface
- **Desktop**: User menu with avatar, name, and dropdown
- **Mobile**: User info in sidebar with profile/logout options
- **Loading states**: Spinners during authentication operations
- **Notifications**: Success/error messages via snackbar

## Mock Data

The service generates mock data including:
- Random user IDs
- Mock JWT tokens
- Avatar URLs from UI Avatars service
- User creation timestamps

## Storage

- Uses `sessionStorage` for token and user data persistence
- Data persists across page refreshes but not across browser sessions
- Automatic cleanup on logout or invalid token

## Future Integration

When connecting to real backend:
1. Replace mock service methods with HTTP calls
2. Update API endpoints in service methods
3. Handle real JWT token validation
4. Implement refresh token logic if needed
5. Add proper error handling for network issues

## Testing

To test the authentication system:
1. Start the development server: `npm start`
2. Navigate to `/login` or `/register`
3. Enter any valid email address
4. For register, also enter a full name
5. Submit the form to authenticate
6. Verify user menu appears in header
7. Test logout functionality
8. Test route protection by navigating directly to protected routes
