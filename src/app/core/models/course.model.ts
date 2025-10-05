export interface Course {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  videoUrl: string;
  price: number;
  discountPrice: number;
  duration: number;
  level: string;
  language: string;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  enrollmentCount: number;
  createdAt: string;
  category: Category;
  instructor: Instructor;
}

export interface Instructor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string;
  dateOfBirth: string;
  bio: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CourseSearchResponse {
  data: Course[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  filters: FilterOption[];
}

export interface FilterOption {
  label: string;
  key: string;
  options: FilterBucket[];
}

export interface FilterBucket {
  label: string;
  value: string;
  isSelected: boolean;
}

export interface PaginationMeta {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalResults: number;
}

// API Response interfaces
export interface ApiCourseResponse {
  data: Course[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
