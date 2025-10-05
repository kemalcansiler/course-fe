import { Course, Instructor } from './course.model';

export interface CourseDetail extends Omit<Course, 'duration'> {
  courseIncludes: CourseInclude[];
  curriculum: CourseSection[];
  targetAudience: string[];
  relatedTopics: string[];
  reviews: CourseReview[];
  duration: string;
  lectures?: number;
  sections: number;
}

export interface CourseInclude {
  icon: string;
  text: string;
}

export interface CourseSection {
  id: string;
  title: string;
  lectures: number;
  duration: string;
  isExpanded: boolean;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isPreview: boolean;
  type: 'video' | 'quiz' | 'article';
}

export interface CourseReview {
  id: string;
  studentName: string;
  studentImage: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

export interface CoursePricing {
  originalPrice: number;
  currentPrice: number;
  discountPercentage: number;
  currency: string;
  isOnSale: boolean;
  subscriptionPrice: number;
  subscriptionTrialDays: number;
}
