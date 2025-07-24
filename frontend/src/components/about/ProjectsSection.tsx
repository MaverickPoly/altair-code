"use client";
import React from "react";
import type { SetStateAction } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { type ProjectDataType, projects } from "../../data/projects.data.ts";
import { Link } from "react-router";
import FloatingBlob from "../FloatingBlob.tsx";
import { RandomizedTextEffect } from "../utils/RandomizedTextEffect.tsx";

const article = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      // type: "spring",
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1, // Stagger duration for children
    },
  },
};

interface GaleryProps {
  projects: ProjectDataType[];
  setIndex: React.Dispatch<SetStateAction<number>>;
  index: number | undefined;
}
function Gallery({ projects, setIndex, index }: GaleryProps) {
  return (
    <div className="max-w-7xl mx-auto gap-1 flex items-center justify-center pb-20 pt-10 ">
      {projects.slice(0, 5).map((project, i: number) => {
        return (
          <motion.div
            whileTap={{ scale: 0.95 }}
            className={`rounded-xl relative ${
              index === i
                ? "w-[300px] sm:w-[400px] md:w-[650px] "
                : "w-[30px] sm:w-[50px] md:w-[70px]"
            } h-[300px] sm:h-[400px] md:h-[600px] flex-shrink-0  transition-[width] ease-in-linear duration-500 origin-center  `}
            key={i}
            onClick={() => {
              setIndex(i);
            }}
            onMouseEnter={() => {
              setIndex(i);
            }}
          >
            <motion.img
              src={project.image}
              className={`${
                index === i ? "cursor-default" : "cursor-pointer"
              } w-full rounded-xl  h-full object-cover `}
            />
            <AnimatePresence mode="wait">
              {index === i && (
                <Link to={project.github_url} target="_blank">
                  <motion.article
                    variants={article}
                    initial="hidden"
                    animate="show"
                    className="absolute flex rounded-xl w-full  flex-col justify-end h-full top-0 p-3 space-y-2 overflow-hidden bg-gradient-to-t dark:from-gray-900/60 from-gray-100/60  from-20% to-transparent to-80% "
                  >
                    <motion.h1
                      variants={article}
                      className="text-3xl md:text-5xl font-bold md:font-extrabold mb-8"
                    >
                      {project.title}
                    </motion.h1>
                    <motion.p
                      variants={article}
                      className="leading-[120%] text-md md:text-xl font-medium md:font-semibold text-neutral-300 mb-6"
                    >
                      {project.description}
                    </motion.p>
                  </motion.article>
                </Link>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function ProjectsSection() {
  const [index, setIndex] = useState(2);

  return (
    <div className="relative">
      <FloatingBlob
        size={550}
        colorFrom="#4B0082"
        colorTo="transparent"
        initial={{ x: 200, y: 250, scale: 1 }}
        animate={{ x: 140, y: 200, scale: 0.9 }}
        duration={14}
        className="pointer-events-none absolute -z-10 -top-[200px] right-0"
      />
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-7xl font-extrabold text-center text-orange-500 mb-10"
      >
        <RandomizedTextEffect text="Projects Gallery" />
      </motion.h2>
      <Gallery projects={projects} index={index} setIndex={setIndex} />
    </div>
  );
}
