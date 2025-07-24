import { useParams, Link, Navigate } from "react-router";
import { useEffect, useState } from "react";
import type { LanguageWithCourses } from "../../types";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function LanguageDetailsPage() {
  const { languageSlug } = useParams<{ languageSlug: string }>();
  const [language, setLanguage] = useState<LanguageWithCourses | null>(null);
  const [descriptionContent, setDescriptionContent] = useState("");
  const { languages } = useCourse();

  if (!languageSlug) return <Navigate to="/courses" />;

  useEffect(() => {
    const lang = languages.find((l) => l.slug === languageSlug) || null;
    setLanguage(lang);

    setDescriptionContent(md.render(lang?.description || ""));
  }, [languageSlug]);

  if (!language) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <p className="text-neutral-400">Language not found.</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative h-[340px] sm:h-[460px] md:h-[540px] lg:h-[640px]">
        <img
          src={language.image}
          alt={language.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end px-6 pb-10">
          <Link
            to="/courses"
            className="mb-6 flex items-center gap-2 text-neutral-300 hover:text-white group"
          >
            <ArrowLeft
              size={24}
              className="group-hover:-translate-x-1 duration-300"
            />
            Back to courses
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent"
          >
            {language.name}
          </motion.h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-14">
        <div
          className="my-16 prose-neutral prose-sm md:prose-md lg:prose-lg"
          dangerouslySetInnerHTML={{ __html: descriptionContent }}
        />
        <h2 className="text-3xl font-bold mb-8">Courses</h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {language.courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </motion.div>
      </section>
    </>
  );
}

import type { CourseType } from "../../types";
import { md } from "../../utils/md.ts";
import { useCourse } from "../../context/CourseContext.tsx";

function CourseCard({ course }: { course: CourseType }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 16px 32px rgba(0,0,0,0.25)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-600 hover:border-orange-500 cursor-pointer"
    >
      <div className="relative">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-44 object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-orange-600 text-xs px-3 py-1 rounded-full">
          {course.category}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-sm text-neutral-400 line-clamp-3">
          {course.description}
        </p>
      </div>
    </motion.div>
  );
}
