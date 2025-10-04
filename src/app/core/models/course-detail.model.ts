import { Course } from './course.model';

export interface CourseDetail extends Course {
  description: string;
  lastUpdated: string;
  language: string;
  subtitles: string[];
  whatYouWillLearn: string[];
  courseIncludes: CourseInclude[];
  curriculum: CourseSection[];
  instructor: Instructor;
  requirements: string[];
  targetAudience: string[];
  relatedTopics: string[];
  reviews: CourseReview[];
  totalStudents: number;
  level: string;
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

export interface Instructor {
  id: string;
  name: string;
  title: string;
  imageUrl: string;
  rating: number;
  totalStudents: number;
  totalCourses: number;
  description: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
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
