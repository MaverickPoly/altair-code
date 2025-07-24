import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  CourseContextType,
  CourseWithLessons,
  LanguageType,
  LanguageWithCourses,
  LessonType,
} from "../types";
import { api } from "../utils/axios";

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider = ({ children }: { children: ReactNode }) => {
  const [languages, setLanguages] = useState<LanguageType[]>([]);
  const [courses, setCourses] = useState<CourseWithLessons[]>([]);
  const [lessons, setLessons] = useState<LessonType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLanguagesAndCourses = async () => {
    try {
      setLoading(true);
      const [langRes, courseRes] = await Promise.all([
        api.get<LanguageType[]>("learning/programming-languages/"),
        api.get<CourseWithLessons[]>("learning/courses/"),
      ]);

      setLanguages(langRes.data);
      setCourses(courseRes.data);
      setLoading(false);
      return { success: true, message: "Fetched all data." };
    } catch (e: any) {
      setLoading(false);
      return {
        success: false,
        message: e?.response?.data?.detail || "Error fetching data!",
      };
    }
  };

  const fetchLessons = async () => {
    try {
      const r = await api.get("learning/lessons/");
      setLessons(r.data);
      return { success: true, message: "Lessons fetched." };
    } catch (e: any) {
      return { success: false, message: "Error fetching lessons." };
    }
  };

  const languagesWithCourses: LanguageWithCourses[] = useMemo(() => {
    const map: Record<number, LanguageWithCourses> = {};
    languages.forEach((l) => (map[l.id] = { ...l, courses: [] }));
    courses.forEach((c) => {
      const lang = map[c.language];
      if (lang) lang.courses.push(c);
    });
    return Object.values(map);
  }, [languages, courses]);

  useEffect(() => {
    fetchLanguagesAndCourses();
  }, []);

  return (
    <CourseContext.Provider
      value={{
        languages: languagesWithCourses,
        courses,
        lessons,
        loading,
        refreshAll: fetchLanguagesAndCourses,
        fetchLessons,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error("useCourse must be inside CourseProvider");
  return ctx;
};
