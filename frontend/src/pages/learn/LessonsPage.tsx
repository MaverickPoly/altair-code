// pages/LessonsPage.tsx
import {
  ArrowLeft,
  BookOpen,
  Clock,
  ChevronRight,
  Info,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, Navigate, useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import Loader from "../../components/Loader";
import { languageMetadata, type LanguageMetadataType } from "./CoursesPage";
import { useCourse } from "../../context/CourseContext";

export default function LessonsPage() {
  /* ---------- params & context ---------- */
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { courses, languages, loading } = useCourse();

  /* ---------- derive course & language ---------- */
  const course = useMemo(
    () => courses.find((c) => c.slug === courseSlug),
    [courses, courseSlug],
  );
  const language = useMemo(
    () => languages.find((l) => l.id === course?.language),
    [languages, course],
  );
  const langMeta: LanguageMetadataType =
    languageMetadata.find((m) => m.name === language?.slug) ??
    languageMetadata[0];

  /* ---------- local ui state ---------- */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  /* lock body scroll when modal open */
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isModalOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isModalOpen]);

  if (loading) return <Loader />;
  if (!course || !language) return <Navigate to="/courses" />;

  /* ---------- helpers ---------- */
  const toggleModal = () => setIsModalOpen((p) => !p);
  const navigateLesson = (num: number) =>
    navigate(`/courses/${course.slug}/${num}`);

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 px-6 mb-16 flex flex-col">
        {/* -------- nav row -------- */}
        <div className="flex items-center justify-between mb-8 text-neutral-300">
          <Link
            to="/courses"
            className="flex items-center gap-2 hover:text-neutral-100 group"
          >
            <ArrowLeft
              size={26}
              className="group-hover:-translate-x-1 duration-300"
            />
            <span className="text-lg">Back</span>
          </Link>
          <button
            onClick={toggleModal}
            className="p-2 rounded-lg hover:bg-neutral-800"
          >
            <Info size={27} />
          </button>
        </div>

        {/* -------- hero -------- */}
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] object-cover rounded-xl mb-6"
        />
        <h1 className="text-4xl font-bold lg:leading-[80px] mb-5">
          {course.title}
        </h1>

        {/* -------- meta -------- */}
        <div className="flex items-center justify-between">
          <span className="px-4 py-2 rounded-xl text-xl font-semibold bg-orange-700 capitalize">
            {course.category}
          </span>
          <span className="flex items-center gap-3">
            {langMeta.icon}
            <span className="text-xl font-semibold tracking-tight">
              {language.name}
            </span>
          </span>
        </div>

        <div className="flex items-center justify-between mt-10 md:px-10">
          <div className="flex items-center gap-2">
            <BookOpen size={25} />
            <span className="text-xl">{course.lessons.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={23} />
            <span>{course.created_at.split("T")[0]}</span>
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-neutral-600 my-14" />

        {/* -------- lesson list -------- */}
        <div className="flex flex-col gap-3">
          {course.lessons.map((lesson) => (
            <Link
              key={lesson.id}
              to={`${lesson.number}/`}
              onClick={() => navigateLesson(lesson.number)}
              className="flex items-center rounded-xl p-6 hover:bg-neutral-800
                         border border-neutral-700 group"
            >
              <span className="text-2xl font-medium">#{lesson.number}</span>
              <span className="flex-1 text-xl font-bold ml-6">
                {lesson.title}
              </span>
              <ChevronRight
                size={25}
                className="group-hover:-translate-x-1 duration-200"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* -------- modal -------- */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center
                       bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 240, damping: 20 }}
              className="w-[90%] max-w-md max-h-[90vh] overflow-y-auto
                         bg-neutral-800 rounded-2xl p-6 shadow-lg relative"
            >
              <button
                onClick={toggleModal}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-neutral-700"
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-bold mb-4">{course.title}</h3>
              <p className="leading-relaxed">{course.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
