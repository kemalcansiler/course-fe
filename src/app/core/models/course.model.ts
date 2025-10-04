export interface Course {
  id: string;
  title: string;
  headline: string;
  imageUrl: string;
  instructorName: string;
  averageRating: number;
  ratingCount: number;
  totalHours: number;
  lectureCount: number;
  level: string;
  price: number;
  badges: string[];
  isFree: boolean;
}

export interface CourseSearchResponse {
  totalResults: number;
  courses: Course[];
  filters: FilterOption[];
  pagination: PaginationMeta;
}

export interface FilterOption {
  label: string;
  key: string;
  options: FilterBucket[];
}

export interface FilterBucket {
  label: string;
  value: string;
  count: number;
  isSelected: boolean;
}

export interface PaginationMeta {
  currentPage: number;
  pageCount: number;
  pageSize: number;
  totalResults: number;
}
