import { useEffect, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import { md } from "../../utils/md";
import LessonsSidebar from "../../components/LessonSidebar";
import Loader from "../../components/Loader";
import { useCourse } from "../../context/CourseContext";
import type { LessonType } from "../../types";
import { useAuth } from "../../context/AuthContext.tsx";
import { FaCheck } from "react-icons/fa";

export default function LessonPage() {
  /* ---------- route params ---------- */
  const { courseSlug, lessonNumber } = useParams<{
    courseSlug: string;
    lessonNumber: string;
  }>();

  /* ---------- context ---------- */
  const {
    courses,
    lessons,
    loading,
    fetchLessons, // fetch all lessons (once)
  } = useCourse();
  const { markLessonComplete, profile } = useAuth();

  /* ---------- locate course ---------- */
  const course = useMemo(
    () => courses.find((c) => c.slug === courseSlug),
    [courses, courseSlug],
  );

  /* ---------- ensure lessons loaded ---------- */
  useEffect(() => {
    if (!course) return;
    if (!lessons.some((l) => l.course === course.id)) {
      fetchLessons(); // get all lessons; could be scoped endpoint
    }
  }, [course, lessons, fetchLessons]);

  /* ---------- filter lessons for this course ---------- */
  const courseLessons = useMemo(
    () => lessons.filter((l) => l.course === course?.id),
    [lessons, course],
  );

  /* ---------- current lesson ---------- */
  const lesson: LessonType | undefined = useMemo(
    () =>
      courseLessons.find(
        (l) => l.number === Number(lessonNumber ?? courseLessons[0]?.number),
      ),
    [courseLessons, lessonNumber],
  );

  /* ---------- guards ---------- */
  if (loading || !courses.length) return <Loader />;
  if (!course) return <Navigate to="/courses" />;
  if (!lesson) return <Navigate to={`/courses/${course.slug}`} />;

  /* ---------- functions ---------- */
  const handleComplete = async () => {
    const res = await markLessonComplete(lesson.id);
    if (res.success) {
      alert("Lesson completed! 🎉");
    } else {
      alert(res.message);
    }
  };

  console.log("Completed lessons:");
  console.log(profile?.completed_lessons);

  const htmlContent = md.render(lesson.content);
  const htmlExercise = md.render(lesson.exercise);
  const isCompleted = profile?.completed_lessons.includes(lesson.id);

  return (
    <div className="max-w-[1300px] mx-auto my-10 flex flex-col md:flex-row gap-8 px-8">
      {/* -------- main -------- */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8 text-neutral-300">
          <Link
            to={`/courses/${course.slug}`}
            className="flex items-center gap-2 hover:text-neutral-100 group"
          >
            <ArrowLeft
              size={26}
              className="group-hover:-translate-x-1 duration-300"
            />
            <span className="text-lg">Back</span>
          </Link>
        </div>

        <h2 className="text-2xl lg:text-4xl font-bold">
          <span className="text-orange-500 font-extrabold">
            #{lesson.number}
          </span>{" "}
          {lesson.title}
        </h2>

        {isCompleted ? (
          <div className="flex gap-4 items-center mt-6 text-green-600">
            <FaCheck size={30} />
            <span className="text-xl">Completed</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="mt-10 px-4 py-2 text-lg bg-orange-600 rounded-lg hover:bg-orange-500 cursor-pointer"
          >
            Mark Lesson Complete
          </button>
        )}
        <div className="h-px bg-neutral-600 w-full my-14" />

        {/* Markdown content */}
        <div
          className="markdown-body prose-neutral prose-sm lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="h-px bg-neutral-600 w-full my-8" />

        <h3 className="text-xl lg:text-2xl font-semibold mb-6">Exercise</h3>

        <div
          className="markdown-body prose-neutral lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: htmlExercise }}
        />
      </div>

      {/* -------- sidebar -------- */}
      <LessonsSidebar lessons={courseLessons} currentId={lesson.id} />
    </div>
  );
}
