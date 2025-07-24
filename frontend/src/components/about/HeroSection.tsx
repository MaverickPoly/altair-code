import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef } from "react";
import FloatingBlob from "../FloatingBlob";
import WaveButton from "../WaveButton";
import { RandomizedTextEffect } from "../utils/RandomizedTextEffect.tsx";
import { Sparkles } from "../utils/sparkles.tsx";

export default function HeroSection() {
  /* -------- wave button background animation -------- */
  const offset = useMotionValue(0);
  useEffect(() => {
    const c = animate(offset, 100, {
      duration: 2,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    });
    return c.stop;
  }, []);

  /* -------- scroll‑away fade -------- */
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"], // when the top & bottom hit top
  });

  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.7], [1, 0.95]);

  return (
    <>
      <Sparkles
        density={800}
        speed={1.2}
        size={1.2}
        direction="top"
        opacitySpeed={2}
        color="#32A7FF"
        className="absolute inset-x-0 bottom-0 h-full w-full "
      />
      <motion.section
        ref={sectionRef}
        style={{ opacity, scale }}
        className="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-6 md:gap-14 lg:gap-20 px-8 min-h-[85vh] items-center py-28"
      >
        {/* --- floating blobs --- */}
        <FloatingBlob
          size={500}
          colorFrom="#ff7e5f"
          colorTo="transparent"
          initial={{ x: -200, y: -150, scale: 0.9 }}
          animate={{ x: -120, y: -80, scale: 1.2 }}
          className="pointer-events-none fixed -z-10 -top-16 -left-36"
        />
        <FloatingBlob
          size={480}
          colorFrom="#c08153"
          colorTo="transparent"
          initial={{ x: 200, y: 250, scale: 1 }}
          animate={{ x: 140, y: 200, scale: 0.9 }}
          duration={14}
          className="pointer-events-none fixed -z-10 bottom-[120px] right-0"
        />

        {/* --- left column --- */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-3 flex-1 items-center md:items-start"
        >
          <h1 className="text-7xl leading-[80px] font-extrabold mb-4 text-orange-500 drop-shadow">
            <RandomizedTextEffect text="Altair Code" />
          </h1>
          <p className="text-2xl text-neutral-300 font-semibold max-w-xl">
            Making every single line of code really matter.
          </p>{" "}
          <WaveButton className="mt-10">Explore my work</WaveButton>
        </motion.div>

        {/* --- right image --- */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-auto rounded-4xl shadow-orange-800/40 shadow-lg hover:shadow-xl duration-300"
          />
        </motion.div>
      </motion.section>
    </>
  );
}
