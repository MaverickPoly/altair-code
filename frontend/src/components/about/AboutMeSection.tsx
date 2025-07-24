import { motion } from "framer-motion";
import { RandomizedTextEffect } from "../utils/RandomizedTextEffect.tsx";

export default function AboutMeSection() {
  return (
    <section className="relative py-32 px-6 md:px-16 max-w-6xl mx-auto">
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
        className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full blur-3xl z-[-1] bg-gradient-to-tr from-orange-500 via-pink-500 to-purple-500 opacity-40"
      />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold text-center text-orange-500 mb-10"
      >
        <RandomizedTextEffect text="About me" />
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-lg md:text-xl text-neutral-300 text-center max-w-3xl mx-auto leading-relaxed"
      >
        I'm a passionate, 15 year-old full-stack developer from Uzbekistan who
        loves building clean, fast, and elegant applications. I specialize in
        frontend/backend, automation, games, AI, and mobile/desktop apps, and
        love learning new technologies and frameworks to keep up with latest
        updates. Every line of code is crafted with care ✨
      </motion.p>

      {/* Info Box */}
      <div className="mt-14 flex justify-center w-full gap-10 items-center">
        {/* Left Content */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="text-neutral-200 space-y-4 text-lg"
        >
          {[
            "⚡ Fluent in JavaScript, Python, C++, Go, Dart and more",
            "🎮 Love game dev, AI, math, and system programming",
            "🚀 Built 100s of micro-projects to master different stacks",
            "🧠 Learning something new every day",
          ].map((item, i) => (
            <motion.li
              key={i}
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.5 }}
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        {/* Right Image Card */}
        {/*<motion.div*/}
        {/*  initial={{ opacity: 0, y: 20, rotate: -2 }}*/}
        {/*  whileInView={{ opacity: 1, y: 0, rotate: 0 }}*/}
        {/*  viewport={{ once: true }}*/}
        {/*  transition={{ duration: 0.8 }}*/}
        {/*  className="rounded-3xl overflow-hidden border border-neutral-700 shadow-lg"*/}
        {/*>*/}
        {/*  <img*/}
        {/*    src="/profile-placeholder.jpg"*/}
        {/*    alt="Me coding"*/}
        {/*    className="object-cover w-full h-full hover:scale-105 duration-500"*/}
        {/*  />*/}
        {/*</motion.div>*/}
      </div>
    </section>
  );
}
