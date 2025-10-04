import { Injectable, signal, computed } from '@angular/core';
import { Observable, of, delay, map } from 'rxjs';
import { Course, CourseSearchResponse, FilterOption, PaginationMeta } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesData = signal<CourseSearchResponse>({
    totalResults: 0,
    courses: [],
    filters: [],
    pagination: {
      currentPage: 0,
      pageCount: 0,
      pageSize: 12,
      totalResults: 0,
    },
  });

  private loading = signal(false);
  private error = signal<string | null>(null);

  // Public signals
  courses = computed(() => this.coursesData());
  isLoading = computed(() => this.loading());
  hasError = computed(() => this.error());

  // Mock data
  private mockCourses: Course[] = [
    {
      id: '5061666',
      title: 'ChatGPT: Complete ChatGPT Course For Work 2025 (Ethically)!',
      headline:
        'ChatGPT Artificial Intelligence (AI) Is Revolutionizing Work. Let ChatGPT 5 AI Help You In So Many Ways. New ChatGPT 5.',
      imageUrl: 'https://img-c.udemycdn.com/course/480x270/5061666_b32b_6.jpg',
      instructorName: 'Steve Ballinger, MBA',
      averageRating: 4.5,
      ratingCount: 120499,
      totalHours: 12.5,
      lectureCount: 119,
      level: 'All Levels',
      price: 599.99,
      badges: ['Premium', 'Bestseller'],
      isFree: false,
    },
    {
      id: '5117770',
      title: 'How to use ChatGPT and Generative AI to help create content',
      headline:
        'Master the art of language AI: Learn to generate high-quality content, automate tasks, and unleash your creativity.',
      imageUrl: 'https://img-c.udemycdn.com/course/480x270/5117770_4ac9_9.jpg',
      instructorName: 'Justin Barnett',
      averageRating: 4.5,
      ratingCount: 65370,
      totalHours: 7,
      lectureCount: 73,
      level: 'All Levels',
      price: 499.99,
      badges: ['Premium'],
      isFree: false,
    },
    {
      id: '5408868',
      title: 'Intro to ChatGPT and Generative AI',
      headline:
        'Learn How to Use ChatGPT and Skyrocket Your Productivity! Get a Proper Introduction to the Generative AI Field',
      imageUrl: 'https://img-c.udemycdn.com/course/480x270/5408868_e8e0_3.jpg',
      instructorName: '365 Careers',
      averageRating: 4.5,
      ratingCount: 43939,
      totalHours: 2.3,
      lectureCount: 49,
      level: 'All Levels',
      price: 299.99,
      badges: ['Bestseller', 'Highest Rated'],
      isFree: false,
    },
    {
      id: '5291332',
      title: 'ChatGPT & Generative AI - The Complete Guide',
      headline:
        '10x your productivity via ChatGPT & Generative AI. Master prompt engineering, API use, Midjourney & much more!',
      imageUrl: 'https://img-c.udemycdn.com/course/480x270/5291332_4a58_7.jpg',
      instructorName: 'Academind by Maximilian Schwarzmüller',
      averageRating: 4.6,
      ratingCount: 26707,
      totalHours: 21.5,
      lectureCount: 350,
      level: 'All Levels',
      price: 699.99,
      badges: ['Bestseller'],
      isFree: false,
    },
    {
      id: '5224522',
      title: 'ChatGPT for IT Workers',
      headline: 'Make your IT job easier!',
      imageUrl: 'https://img-c.udemycdn.com/course/480x270/5224522_27aa_2.jpg',
      instructorName: 'Kevin Brown',
      averageRating: 4.5,
      ratingCount: 20204,
      totalHours: 5,
      lectureCount: 78,
      level: 'All Levels',
      price: 399.99,
      badges: [],
      isFree: false,
    },
    {
      id: '5232456',
      title: 'ChatGPT Prompt Writing: The Complete Guide',
      headline:
        'From Beginner to Advanced in prompt writing within Chat GPT. Enhance Your Skills and Unleash the Full Potential of GPT4',
      imageUrl: 'https://img-c.udemycdn.com/course/480x270/5232456_9174_3.jpg',
      instructorName: 'Marius Manola',
      averageRating: 4.5,
      ratingCount: 16838,
      totalHours: 11.3,
      lectureCount: 174,
      level: 'All Levels',
      price: 449.99,
      badges: [],
      isFree: false,
    },
  ];

  private mockFilters: FilterOption[] = [
    {
      label: 'Ratings',
      key: 'ratings',
      options: [
        { label: '4.5 & up', value: '4.5', count: 590, isSelected: true },
        { label: '4.0 & up', value: '4.0', count: 1379, isSelected: false },
        { label: '3.5 & up', value: '3.5', count: 1549, isSelected: false },
        { label: '3.0 & up', value: '3.0', count: 1590, isSelected: false },
      ],
    },
    {
      label: 'Video Duration',
      key: 'duration',
      options: [
        { label: '0-1 Hour', value: 'extraShort', count: 61, isSelected: false },
        { label: '1-3 Hours', value: 'short', count: 261, isSelected: false },
        { label: '3-6 Hours', value: 'medium', count: 151, isSelected: false },
        { label: '6-17 Hours', value: 'long', count: 83, isSelected: false },
        { label: '17+ Hours', value: 'extraLong', count: 34, isSelected: false },
      ],
    },
    {
      label: 'Level',
      key: 'instructional_level',
      options: [
        { label: 'All Levels', value: 'all', count: 364, isSelected: false },
        { label: 'Beginner', value: 'beginner', count: 196, isSelected: false },
        { label: 'Intermediate', value: 'intermediate', count: 21, isSelected: false },
        { label: 'Expert', value: 'expert', count: 9, isSelected: false },
      ],
    },
    {
      label: 'Price',
      key: 'price',
      options: [
        { label: 'Paid', value: 'price-paid', count: 559, isSelected: false },
        { label: 'Free', value: 'price-free', count: 31, isSelected: false },
      ],
    },
  ];

  constructor() {}

  // Generate random delay between 100-500ms
  private getRandomDelay(): number {
    return Math.floor(Math.random() * 400) + 100;
  }

  // Load courses with filters and pagination
  loadCourses(
    page: number = 0,
    pageSize: number = 12,
    sortBy: string = 'most-popular',
    filters: { [key: string]: string[] } = {},
  ): Observable<CourseSearchResponse> {
    this.loading.set(true);
    this.error.set(null);

    return of(this.mockCourses).pipe(
      delay(this.getRandomDelay()),
      map((courses) => {
        // Apply filters
        let filteredCourses = [...courses];

        // Apply rating filter
        if (filters['ratings'] && filters['ratings'].length > 0) {
          const minRating = Math.min(...filters['ratings'].map((r) => parseFloat(r)));
          filteredCourses = filteredCourses.filter((course) => course.averageRating >= minRating);
        }

        // Apply level filter
        if (filters['instructional_level'] && filters['instructional_level'].length > 0) {
          filteredCourses = filteredCourses.filter((course) =>
            filters['instructional_level'].includes(course.level.toLowerCase()),
          );
        }

        // Apply price filter
        if (filters['price'] && filters['price'].length > 0) {
          if (filters['price'].includes('price-free')) {
            filteredCourses = filteredCourses.filter((course) => course.isFree);
          } else if (filters['price'].includes('price-paid')) {
            filteredCourses = filteredCourses.filter((course) => !course.isFree);
          }
        }

        // Apply sorting
        switch (sortBy) {
          case 'highest-rated':
            filteredCourses.sort((a, b) => b.averageRating - a.averageRating);
            break;
          case 'newest':
            // Mock newest sorting
            filteredCourses.sort((a, b) => b.ratingCount - a.ratingCount);
            break;
          case 'price-low-to-high':
            filteredCourses.sort((a, b) => a.price - b.price);
            break;
          case 'price-high-to-low':
            filteredCourses.sort((a, b) => b.price - a.price);
            break;
          default: // most-popular
            filteredCourses.sort((a, b) => b.ratingCount - a.ratingCount);
        }

        // Apply pagination
        const startIndex = page * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

        const totalResults = filteredCourses.length;
        const pageCount = Math.ceil(totalResults / pageSize);

        const response: CourseSearchResponse = {
          totalResults,
          courses: paginatedCourses,
          filters: this.mockFilters,
          pagination: {
            currentPage: page,
            pageCount,
            pageSize,
            totalResults,
          },
        };

        this.coursesData.set(response);
        this.loading.set(false);

        return response;
      }),
    );
  }

  // Update filters
  updateFilters(filters: { [key: string]: string[] }): Observable<CourseSearchResponse> {
    const currentData = this.coursesData();
    return this.loadCourses(
      currentData.pagination.currentPage,
      currentData.pagination.pageSize,
      'most-popular', // Keep current sort
      filters,
    );
  }

  // Update sorting
  updateSorting(sortBy: string): Observable<CourseSearchResponse> {
    const currentData = this.coursesData();
    return this.loadCourses(
      currentData.pagination.currentPage,
      currentData.pagination.pageSize,
      sortBy,
    );
  }

  // Update pagination
  updatePagination(page: number, pageSize: number): Observable<CourseSearchResponse> {
    const currentData = this.coursesData();
    return this.loadCourses(
      page,
      pageSize,
      'most-popular', // Keep current sort
    );
  }

  // Clear error
  clearError(): void {
    this.error.set(null);
  }
}
