export interface ProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  dateOfBirth: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface UpdateProfileRequest {
  firstName: string;
  lastName: string;
  profileImageUrl?: string | null;
  dateOfBirth?: string | null;
  bio?: string | null;
}
