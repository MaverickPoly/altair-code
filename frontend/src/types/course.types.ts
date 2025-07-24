import type { ReturnType } from "./auth.types.ts";

export interface CourseContextType {
  languages: LanguageWithCourses[];
  courses: CourseWithLessons[];
  lessons: LessonType[];
  loading: boolean;
  refreshAll: () => Promise<ReturnType>;
  fetchLessons: () => Promise<ReturnType>;
}

// Models
export interface LanguageType {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

export interface CourseType {
  id: number;
  language: number;
  title: string;
  slug: string;
  image: string;
  category: string;
  description: string;

  created_at: string;
  updated_at: string;
}

export interface LessonType {
  id: number;
  course: number;
  number: number;
  title: string;
  content: string;
  exercise: string;
}

export interface LanguageWithCourses extends LanguageType {
  courses: CourseType[];
}

export interface CourseWithLessons extends CourseType {
  lessons: LessonType[];
}
