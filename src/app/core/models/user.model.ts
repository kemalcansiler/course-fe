export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// The API returns the user data directly, not wrapped in a user property
export type MeResponse = User;

export interface RefreshTokenRequest {
  refreshToken: string;
}
