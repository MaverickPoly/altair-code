import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Code, Map, Newspaper, Trophy, Users } from "lucide-react";

const content = [
  {
    icon: BookOpen,
    title: "Course Library",
    text: "Access a vast library of courses covering Python, JavaScript, Java, C++, and more, designed for beginners to advanced coders.",
  },
  {
    icon: Code,
    title: "Coding Lessons",
    text: "Engage with hands-on lessons featuring real-time coding challenges and expert guidance to build practical skills.",
  },
  {
    icon: Trophy,
    title: "Competitive Leaderboards",
    text: "Climb the ranks by earning XP through challenges and showcase your progress on dynamic leaderboards.",
  },
  {
    icon: Users,
    title: "Personalized Learning Paths",
    text: "Connect with fellow learners, share projects, and grow through personalized profiles and community events.",
  },
  {
    icon: Newspaper,
    title: "Cutting-Edge Articles",
    text: "Stay ahead with the latest programming trends and insights from industry experts in our curated article section.",
  },
  {
    icon: Map,
    title: "Personalized Learning Paths",
    text: "Tailor your learning journey with adaptive paths that match your skill level and career goals.",
  },
];

export const FeaturesSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0.8, 1], ["0vh", "50vh"]);

  return (
    <motion.section
      ref={targetRef}
      style={{ opacity, y }}
      className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-32 max-w-7xl gap-16 md:gap-24 mx-auto px-8"
    >
      {content.map(({ icon: Icon, title, text }) => (
        <div key={title} className="flex flex-col items-center sm:items-start">
          <span className="padding-8 mb-4 flex h-16 w-16 lg:h-32 lg:w-32 items-center justify-center rounded-xl bg-neutral-800">
            <Icon className="w-6 h-6 lg:w-12 lg:h-12" />
          </span>
          <h3 className="mb-2 text-2xl font-bold text-white">{title}</h3>
          <p className="text-md text-neutral-300">{text}</p>
        </div>
      ))}
    </motion.section>
  );
};
