import { FaJava, FaPython } from "react-icons/fa";
// import { languages } from "../../data/courses.data.ts";
import type { CourseType, LanguageWithCourses } from "../../types";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
// import type { ReactElement } from "react";
import {
  SiC,
  SiCplusplus,
  SiDart,
  SiGo,
  SiKotlin,
  SiPhp,
  SiRust,
  SiSwift,
} from "react-icons/si";
import { RiJavascriptFill } from "react-icons/ri";
import { TbBrandCSharp } from "react-icons/tb";
import { type ReactElement } from "react";
import { useCourse } from "../../context/CourseContext.tsx";
import Loader from "../../components/Loader.tsx";

// Animations
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const gridContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

export interface LanguageMetadataType {
  name: string;
  icon: ReactElement;
  colors: string[];
}

export const languageMetadata = [
  {
    name: "python",
    icon: <FaPython size={40} />,
    colors: ["#2f6591", "#51b2ff"],
  },
  {
    name: "javascript",
    icon: <RiJavascriptFill size={40} />,
    colors: ["#9a8b0e", "#ffe718"],
  },
  {
    name: "c",
    icon: <SiC size={40} />,
    colors: ["#656565", "#a4a4a4"],
  },
  {
    name: "cpp",
    icon: <SiCplusplus size={40} />,
    colors: ["#942e4d", "#ff4f84"],
  },
  {
    name: "java",
    icon: <FaJava size={40} />,
    colors: ["#855613", "#d78a1e"],
  },
  {
    name: "go",
    icon: <SiGo size={40} />,
    colors: ["#007a94", "#2ed6ff"],
  },
  {
    name: "php",
    icon: <SiPhp size={40} />,
    colors: ["#3e4975", "#6476be"],
  },
  {
    name: "rust",
    icon: <SiRust size={40} />,
    colors: ["#b02d14", "#ff421f"],
  },
  {
    name: "cs",
    icon: <TbBrandCSharp size={40} />,
    colors: ["#0f5d00", "#23d000"],
  },
  {
    name: "dart",
    icon: <SiDart size={40} />,
    colors: ["#008079", "#00d2c8"],
  },
  {
    name: "kotlin",
    icon: <SiKotlin size={40} />,
    colors: ["#5d428a", "#a87afd"],
  },
  {
    name: "swift",
    icon: <SiSwift size={40} />,
    colors: ["#b03d2d", "#ff5d47"],
  },
];

function LanguageSection({
  language,
  index,
}: {
  language: LanguageWithCourses;
  index: number;
}) {
  const meta =
    languageMetadata.find((m) => m.name === language.slug) ||
    languageMetadata[0];

  return (
    <motion.section
      id={language.slug}
      className="mb-20 flex flex-col scroll-mt-24"
      custom={index}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link
        to={`/languages/${language.slug}`}
        className="flex items-center gap-4 self-start"
      >
        {meta.icon}

        <h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight
                     text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(90deg, ${meta.colors[0]}, ${meta.colors[1]})`,
          }}
        >
          {language.name}
        </h2>
      </Link>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mt-6"
        variants={gridContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {language.courses.map((c) => (
          <CourseCard key={c.id} course={c} />
        ))}
      </motion.div>
    </motion.section>
  );
}

function CourseCard({ course }: { course: CourseType }) {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/courses/${course.slug}`);
  };

  return (
    <motion.div
      onClick={handleNavigate}
      variants={cardVariants}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: "0 12px 24px rgba(0,0,0,0.25)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="relative isolate overflow-hidden rounded-2xl bg-neutral-800/70
                 border border-neutral-600 backdrop-blur
                 hover:border-orange-500 hover:bg-neutral-700/70
                 p-5 flex gap-4 cursor-pointer"
    >
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 via-white/0 to-white/5" />

      <img
        src={course.image}
        alt={course.title}
        className="w-32 h-20 object-cover rounded-lg flex-shrink-0"
      />
      <div className="z-10">
        <h3 className="text-xl font-semibold mb-1 tracking-tight">
          {course.title}
        </h3>
        <span className="uppercase text-sm tracking-wide text-orange-400">
          {course.category}
        </span>
      </div>
    </motion.div>
  );
}

export default function CoursesPage() {
  const { languages, loading } = useCourse();

  if (loading) return <Loader />;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="title mb-14"
      >
        Programming Courses
      </motion.h1>

      {languages.map((lang, idx) => (
        <LanguageSection key={lang.id} language={lang} index={idx} />
      ))}
    </div>
  );
}
