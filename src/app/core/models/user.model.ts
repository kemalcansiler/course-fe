export interface User {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface MeResponse {
  user: User;
}
