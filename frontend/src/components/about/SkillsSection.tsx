import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Skill {
  name: string;
  percent: number;
  color: string;
}

const skills: Skill[] = [
  { name: "Python", percent: 85, color: "bg-[#2f6591]" },
  { name: "JavaScript", percent: 90, color: "bg-[#ffe100]" },
  { name: "C", percent: 55, color: "bg-[#656565]" },
  { name: "C++", percent: 45, color: "bg-[#e00043]" },
  { name: "Go", percent: 20, color: "bg-[#00c6f3]" },
  { name: "Java", percent: 25, color: "bg-[#cc7700]" },
  { name: "PHP", percent: 30, color: "bg-[#3e4975]" },
  { name: "Dart", percent: 40, color: "bg-[#00d3c8]" },
  { name: "C#", percent: 5, color: "bg-[#19a900]" },
];

export default function SkillsSection() {
  return (
    <section className="py-32 px-6 md:px-16 max-w-5xl mx-auto relative">
      {/* Background Blob */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.5, 0.7, 0.5] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute top-12 -left-52 w-[350px] h-[350px] rounded-full blur-3xl z-[-1] bg-gradient-to-tr from-red-500 via-blue-500 to-green-500 opacity-40"
      />

      <h2 className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-orange-500">
        Skills
      </h2>

      <div className="space-y-10">
        {skills.map((skill) => (
          <SkillBar key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}

function SkillBar({ skill }: { skill: Skill }) {
  const barRef = useRef<HTMLDivElement>(null);
  const inView = useInView(barRef, { once: true, margin: "-20% 0px" });
  const widthMV = useMotionValue(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      const controls = animate(0, skill.percent, {
        duration: 1.2,
        ease: "easeOut",
        onUpdate: (v) => setCount(Math.round(v)),
      });
      widthMV.set(skill.percent);
      return controls.stop;
    }
  }, [inView]);

  return (
    <div>
      <div className="flex justify-between items-end mb-1">
        <span className="text-2xl font-semibold">{skill.name}</span>
        <span className="text-xl text-orange-400">{count}%</span>
      </div>

      <div
        ref={barRef}
        className="w-full h-4 rounded-full bg-neutral-700 overflow-hidden"
      >
        <motion.div
          style={{ width: widthMV }}
          animate={inView ? { width: `${skill.percent}%` } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`${skill.color} h-full rounded-full
                     bg-gradient-to-r from-white/10 via-transparent to-white/10`}
        />
      </div>
    </div>
  );
}
